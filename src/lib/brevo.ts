/**
 * Brevo (Sendinblue) API Client & VIP Campaign Dispatcher for Champagne Carbon
 */

export interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  baseUrl: string;
}

export interface BrevoAccountStatus {
  connected: boolean;
  accountEmail?: string;
  companyName?: string;
  planType?: string;
  credits?: number;
  verifiedSender?: boolean;
  error?: string;
  isIpRestricted?: boolean;
  clientIp?: string;
  authUrl?: string;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface TemplateOptions {
  subject?: string;
  previewText?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaUrl?: string;
  featuredImageUrl?: string;
  contactEmail?: string;
}

export function getBrevoConfig(overrideApiKey?: string): BrevoConfig {
  const apiKey = overrideApiKey || process.env.BREVO_API_KEY || '';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contact@manila-wine.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'MANILA WINE';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://champagne-carbon.manila-wine.com';

  return { apiKey, senderEmail, senderName, baseUrl };
}

export function parseAndDeduplicateEmails(rawText: string): {
  valid: string[];
  invalid: string[];
  total: number;
  duplicatesCount: number;
} {
  if (!rawText || !rawText.trim()) {
    return { valid: [], invalid: [], total: 0, duplicatesCount: 0 };
  }

  const rawTokens = rawText
    .split(/[\r\n,;\t ]+/)
    .map(t => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const seen = new Set<string>();
  const valid: string[] = [];
  const invalid: string[] = [];
  let duplicatesCount = 0;

  for (const token of rawTokens) {
    const bracketMatch = token.match(/<([^>]+)>/);
    const candidate = bracketMatch ? bracketMatch[1].trim() : token;

    if (emailRegex.test(candidate)) {
      const lower = candidate.toLowerCase();
      if (seen.has(lower)) {
        duplicatesCount++;
      } else {
        seen.add(lower);
        valid.push(lower);
      }
    } else {
      invalid.push(token);
    }
  }

  return {
    valid,
    invalid,
    total: rawTokens.length,
    duplicatesCount,
  };
}

export async function checkBrevoStatus(overrideApiKey?: string): Promise<BrevoAccountStatus> {
  const config = getBrevoConfig(overrideApiKey);

  if (!config.apiKey) {
    return {
      connected: false,
      error: 'Brevo API key is not configured. Please set BREVO_API_KEY in .env.local or enter it in the admin panel.',
    };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/account', {
      headers: {
        'api-key': config.apiKey,
        'Accept': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const msg: string = data.message || data.error || 'Unauthorized Brevo API key';
      if (msg.toLowerCase().includes('unrecognised ip') || msg.toLowerCase().includes('authorised_ips')) {
        const ipMatch = msg.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
        return {
          connected: false,
          error: msg,
          isIpRestricted: true,
          clientIp: ipMatch ? ipMatch[0] : undefined,
          authUrl: 'https://app.brevo.com/security/authorised_ips',
        };
      }

      return {
        connected: false,
        error: msg,
      };
    }

    let verifiedSender = false;
    try {
      const sendersRes = await fetch('https://api.brevo.com/v3/senders', {
        headers: { 'api-key': config.apiKey, 'Accept': 'application/json' },
      });
      if (sendersRes.ok) {
        const sendersData = await sendersRes.json();
        const senders = sendersData.senders || [];
        verifiedSender = senders.some(
          (s: any) => s.email?.toLowerCase() === config.senderEmail.toLowerCase() && s.active !== false
        );
      }
    } catch {
      // non-critical
    }

    const plan = data.plan?.[0];
    const credits = plan?.credits ?? data.relay?.data?.credits;

    return {
      connected: true,
      accountEmail: data.email,
      companyName: data.companyName,
      planType: plan?.type || 'Standard',
      credits: typeof credits === 'number' ? credits : undefined,
      verifiedSender,
    };
  } catch (err: any) {
    return {
      connected: false,
      error: err.message || 'Network failure connecting to Brevo API',
    };
  }
}

/**
 * Generates the luxury HTML VIP invitation email for Champagne Carbon
 */
export function generateLuxuryEmailHtml(options: TemplateOptions = {}): string {
  const config = getBrevoConfig();
  const baseUrl = config.baseUrl;

  const subject = options.subject || 'Private Selection: You have been hand-picked for an exclusive allocation of Champagne Carbon';
  const previewText = options.previewText || 'Manila Wine presents the official arrival of Champagne Carbon in Manila — handcrafted aerospace carbon-fiber cuvées and Bugatti editions.';
  const headline = options.headline || 'Private Allocation Proposal';
  const subheadline = options.subheadline || 'Champagne Carbon • Exclusive Official Custody by Manila Wine';
  const ctaText = options.ctaText || 'EXPLORE YOUR PRIVATE ALLOCATION';
  const ctaUrl = options.ctaUrl || baseUrl;
  const logoUrl = `${baseUrl}/brand/logo.png`;
  const bottleImageUrl = options.featuredImageUrl || `${baseUrl}/images/bottles/blanc-de-noirs-vintage-2009-1.png`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${subject}</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #060607; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .gold-button {
      background: linear-gradient(135deg, #E5C378 0%, #C9A24B 50%, #9E7E36 100%);
      color: #060607 !important;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      text-decoration: none;
      padding: 16px 36px;
      display: inline-block;
      border-radius: 2px;
      font-size: 13px;
      box-shadow: 0 4px 20px rgba(201, 162, 75, 0.35);
    }
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-title { font-size: 26px !important; line-height: 32px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #060607; color: #F5F2EB;">

  <!-- Preheader text -->
  <div style="display: none; font-size: 1px; color: #060607; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${previewText} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #060607;">
    <tr>
      <td align="center" style="padding: 24px 12px 40px 12px;">
        
        <!-- Main Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #101013; border: 1px solid #222226; border-radius: 6px; overflow: hidden; box-shadow: 0 15px 50px rgba(0,0,0,0.9);">
          
          <!-- Top Accent Gold & Wine Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #9E1B32 0%, #C9A24B 50%, #9E1B32 100%);"></td>
          </tr>

          <!-- Header / Brand Logos -->
          <tr>
            <td align="center" style="padding: 32px 24px 20px 24px; border-bottom: 1px solid #1C1C20;">
              <a href="${baseUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${logoUrl}" alt="Manila Wine" width="200" style="width: 200px; max-width: 100%; height: auto; display: block; border: 0;" />
              </a>
              <div style="margin-top: 14px; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #C9A24B; font-weight: 600;">
                Private Client Services &bull; Exclusive Allocation
              </div>
            </td>
          </tr>

          <!-- Hero Section -->
          <tr>
            <td align="center" class="mobile-padding" style="padding: 36px 36px 20px 36px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="display: inline-block; margin-bottom: 16px;">
                <tr>
                  <td style="background-color: rgba(201, 162, 75, 0.1); border: 1px solid rgba(201, 162, 75, 0.4); border-radius: 50px; padding: 6px 18px;">
                    <span style="color: #C9A24B; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                      Hand-Selected Private Allocation
                    </span>
                  </td>
                </tr>
              </table>

              <h1 class="mobile-title" style="margin: 0 0 10px 0; font-family: 'Times New Roman', Georgia, serif; font-size: 32px; line-height: 40px; color: #FFFFFF; font-weight: 400; letter-spacing: 0.5px;">
                ${headline}
              </h1>

              <div style="color: #C9A24B; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 500; margin-bottom: 24px;">
                ${subheadline}
              </div>

              <!-- Bottle Image Showcase -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 8px 0 28px 0;">
                <tr>
                  <td align="center">
                    <div style="background: radial-gradient(circle, rgba(201,162,75,0.15) 0%, rgba(16,16,19,0) 70%); padding: 16px; border-radius: 8px;">
                      <a href="${ctaUrl}" target="_blank" style="text-decoration: none;">
                        <img src="${bottleImageUrl}" alt="Champagne Carbon Bottle" width="480" style="width: 100%; max-width: 480px; height: auto; display: block; border-radius: 4px;" />
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Body Letter -->
              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 26px; color: #E0DDD5; text-align: left;">
                Dear Distinguished Client,
              </p>
              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 26px; color: #E0DDD5; text-align: left;">
                Manila Wine is privileged to inform you that you have been <strong>personally selected</strong> to receive a private allocation proposal for the arrival of <strong>Champagne Carbon</strong> in the Philippines.
              </p>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 26px; color: #E0DDD5; text-align: left;">
                As the <strong>first to bring and offer Champagne Carbon in the Philippines</strong>, our cellars hold a strictly limited direct allocation of these exceptional cuvées. Each bottle is an extraordinary marriage of 5th-generation Grand Cru winemaking and aerospace innovation — cloaked in an authentic carbon-fiber armor requiring 37 complex handcrafted steps.
              </p>

              <!-- Three Pillars -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #17171C; border: 1px solid #282830; border-radius: 6px; margin: 24px 0; text-align: left;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="color: #C9A24B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                      1. Philippine Premiere in Manila
                    </div>
                    <div style="color: #B0ADA5; font-size: 13px; line-height: 20px;">
                      Handcrafted in Champillon, France, first introduced and offered to connoisseurs in Manila by Manila Wine.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 20px;"><div style="border-top: 1px solid #23232A;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="color: #C9A24B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                      2. Aerospace Handcrafted Bottle (37 Steps)
                    </div>
                    <div style="color: #B0ADA5; font-size: 13px; line-height: 20px;">
                      A real carbon-fiber shell blocks 100% of light, preserving delicate aromatic nuances and maintaining optimal tasting integrity over time.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 20px;"><div style="border-top: 1px solid #23232A;"></div></td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="color: #C9A24B; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                      3. Official Bugatti Editions & Vintage Grand Crus
                    </div>
                    <div style="color: #B0ADA5; font-size: 13px; line-height: 20px;">
                      Available in Bottle (75 cl), Magnum (1.5 L), and Jeroboam (3 L), including the legendary ƎB.01 2002, ƎB.02 Chiron 300+, and Bolide 2017.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 32px 0 20px 0;">
                <tr>
                  <td align="center" style="border-radius: 2px;">
                    <a href="${ctaUrl}" target="_blank" class="gold-button">
                      ${ctaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <div style="font-size: 12px; color: #888888; margin-bottom: 24px;">
                Allocations are granted on a strictly first-come, first-served basis.
              </div>

              <!-- Concierge direct support -->
              <div style="border-top: 1px solid #222226; padding-top: 20px; margin-top: 20px; font-size: 13px; color: #A5A29B;">
                Need personal concierge assistance or corporate allocation?<br />
                Direct Hotline: <a href="tel:+639178600808" style="color: #C9A24B; text-decoration: none; font-weight: 600;">+63917 860 0808</a> &bull; 
                <a href="mailto:contact@manila-wine.com" style="color: #C9A24B; text-decoration: none; font-weight: 600;">contact@manila-wine.com</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0A0A0C; border-top: 1px solid #1C1C20; padding: 28px 36px;" class="mobile-padding">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="font-size: 11px; line-height: 18px; color: #666666;">
                    <p style="margin: 0 0 8px 0; color: #888888;">
                      <strong style="color: #C9A24B;">MANILA WINE PRIVATE CLIENT CONCIERGE</strong><br />
                      First to Offer Champagne Carbon in the Philippines
                    </p>
                    <p style="margin: 0 0 12px 0;">
                      <strong>Drink Responsibly.</strong> Only for individuals of legal drinking age (18+).
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 11px; color: #555555;">
                      You are receiving this private communication as a valued Manila Wine VIP client.<br />
                      <a href="{{ unsubscribe }}" style="color: #888888; text-decoration: underline;">Unsubscribe</a> &bull; 
                      <a href="https://manila-wine.com" style="color: #888888; text-decoration: underline;">Visit Manila-Wine.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function sendTestEmail(recipientEmail: string, options: TemplateOptions = {}, overrideApiKey?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const config = getBrevoConfig(overrideApiKey);
  if (!config.apiKey) {
    return { success: false, error: 'Brevo API key is not configured.' };
  }

  const htmlContent = generateLuxuryEmailHtml(options);
  const subject = options.subject || 'Private Selection: You have been hand-picked for an exclusive allocation of Champagne Carbon';

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': config.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: config.senderName, email: config.senderEmail },
        to: [{ email: recipientEmail }],
        subject: `[TEST] ${subject}`,
        htmlContent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || 'Failed to dispatch test email.' };
    }

    return { success: true, messageId: data.messageId };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error sending test email.' };
  }
}

export async function launchCampaignBlast(emails: string[], options: TemplateOptions = {}, overrideApiKey?: string): Promise<{
  success: boolean;
  totalSent: number;
  totalFailed: number;
  errors: string[];
}> {
  const config = getBrevoConfig(overrideApiKey);
  if (!config.apiKey) {
    return { success: false, totalSent: 0, totalFailed: emails.length, errors: ['Brevo API key not configured.'] };
  }

  const htmlContent = generateLuxuryEmailHtml(options);
  const subject = options.subject || 'Private Selection: You have been hand-picked for an exclusive allocation of Champagne Carbon';

  let totalSent = 0;
  let totalFailed = 0;
  const errors: string[] = [];

  const BATCH_SIZE = 50;
  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const batch = emails.slice(i, i + BATCH_SIZE);
    
    // Send in parallel per batch
    const promises = batch.map(async (email) => {
      try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': config.apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: config.senderName, email: config.senderEmail },
            to: [{ email }],
            subject,
            htmlContent,
          }),
        });
        if (res.ok) {
          totalSent++;
        } else {
          totalFailed++;
          const errData = await res.json();
          errors.push(`${email}: ${errData.message || 'Failed'}`);
        }
      } catch (err: any) {
        totalFailed++;
        errors.push(`${email}: ${err.message}`);
      }
    });

    await Promise.all(promises);
    // Small delay between batches to respect rate limits
    if (i + BATCH_SIZE < emails.length) {
      await new Promise(r => setTimeout(r, 250));
    }
  }

  return {
    success: totalSent > 0,
    totalSent,
    totalFailed,
    errors: errors.slice(0, 10),
  };
}
