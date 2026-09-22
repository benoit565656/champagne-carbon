import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendAllocationInquiryEmail, AllocationInquiryData } from '@/lib/brevo';

export const dynamic = 'force-dynamic';

const ROOT_INQUIRIES_PATH = path.join(process.cwd(), 'data', 'inquiries.json');
const TMP_INQUIRIES_PATH = path.join('/tmp', 'carbon_inquiries.json');

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    try {
      fs.mkdirSync(dirname, { recursive: true });
    } catch {
      // ignore
    }
  }
}

function saveInquiryLocally(inquiry: AllocationInquiryData) {
  const record = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    ...inquiry,
    createdAt: new Date().toISOString(),
  };

  let inquiries: any[] = [];
  try {
    if (fs.existsSync(TMP_INQUIRIES_PATH)) {
      inquiries = JSON.parse(fs.readFileSync(TMP_INQUIRIES_PATH, 'utf-8'));
    } else if (fs.existsSync(ROOT_INQUIRIES_PATH)) {
      inquiries = JSON.parse(fs.readFileSync(ROOT_INQUIRIES_PATH, 'utf-8'));
    }
  } catch {
    inquiries = [];
  }

  inquiries.unshift(record);
  const json = JSON.stringify(inquiries, null, 2);

  try {
    ensureDirectoryExistence(ROOT_INQUIRIES_PATH);
    fs.writeFileSync(ROOT_INQUIRIES_PATH, json, 'utf-8');
  } catch {
    // Ignore in read-only serverless filesystem
  }

  try {
    ensureDirectoryExistence(TMP_INQUIRIES_PATH);
    fs.writeFileSync(TMP_INQUIRIES_PATH, json, 'utf-8');
  } catch {
    // Ignore
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, cuveeInterest, formatInterest, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Please provide your full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ error: 'Please provide a contact phone or Viber number.' }, { status: 400 });
    }

    const inquiryData: AllocationInquiryData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      cuveeInterest: cuveeInterest || 'Any / General Allocation',
      formatInterest: formatInterest || 'Bottle 75 cl',
      message: message ? message.trim() : '',
    };

    // Save locally
    saveInquiryLocally(inquiryData);

    // Dispatch email via Brevo to contact@manila-wine.com and send acknowledgment to client
    const emailResult = await sendAllocationInquiryEmail(inquiryData);

    if (!emailResult.success) {
      console.warn('Inquiry saved locally but Brevo dispatch warning:', emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted. Our concierge will contact you within 24 hours.',
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error processing allocation inquiry.' },
      { status: 500 }
    );
  }
}
