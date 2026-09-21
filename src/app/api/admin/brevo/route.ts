
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { 
  checkBrevoStatus, 
  generateLuxuryEmailHtml, 
  sendTestEmail, 
  launchCampaignBlast,
  parseAndDeduplicateEmails,
  getBrevoConfig
} from '@/lib/brevo';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');
    const subject = searchParams.get('subject') || undefined;
    const headline = searchParams.get('headline') || undefined;
    const previewText = searchParams.get('previewText') || undefined;
    const ctaText = searchParams.get('ctaText') || undefined;
    const apiKeyOverride = searchParams.get('apiKey') || undefined;

    const html = generateLuxuryEmailHtml({
      subject,
      headline,
      previewText,
      ctaText,
    });

    if (format === 'html') {
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Frame-Options': 'SAMEORIGIN',
        },
      });
    }

    const status = await checkBrevoStatus(apiKeyOverride);
    const config = getBrevoConfig(apiKeyOverride);

    return NextResponse.json({
      status,
      config: {
        senderEmail: config.senderEmail,
        senderName: config.senderName,
        hasApiKey: Boolean(config.apiKey),
        maskedKey: config.apiKey ? `${config.apiKey.slice(0, 12)}...${config.apiKey.slice(-6)}` : null,
      },
      previewSubject: subject || 'Private Selection: You have been hand-picked for an exclusive allocation of Champagne Carbon',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const action = body.action;

    switch (action) {
      case 'check-status': {
        const status = await checkBrevoStatus(body.apiKey);
        return NextResponse.json({ status });
      }

      case 'send-test': {
        const result = await sendTestEmail(
          body.recipientEmail, 
          {
            subject: body.subject,
            headline: body.headline,
            previewText: body.previewText,
            ctaText: body.ctaText,
          },
          body.apiKey
        );
        return NextResponse.json(result);
      }

      case 'parse-emails': {
        const parsed = parseAndDeduplicateEmails(body.rawText || '');
        return NextResponse.json(parsed);
      }

      case 'launch-blast': {
        const { emails, templateOptions, apiKey } = body;
        if (!Array.isArray(emails) || emails.length === 0) {
          return NextResponse.json({ error: 'No recipient emails provided' }, { status: 400 });
        }

        const result = await launchCampaignBlast(emails, templateOptions || {}, apiKey);
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
