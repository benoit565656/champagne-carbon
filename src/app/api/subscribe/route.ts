import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email format.' },
        { status: 400 }
      );
    }

    const result = await addSubscriber(
      email,
      source || 'Private Access Section'
    );

    return NextResponse.json({
      success: true,
      isNew: result.isNew,
      message: 'Thank you. You have been added to our private allocation list.',
    });
  } catch (err: any) {
    console.error('Error subscribing email:', err);
    return NextResponse.json(
      { error: err.message || 'Unable to subscribe at this time.' },
      { status: 500 }
    );
  }
}
