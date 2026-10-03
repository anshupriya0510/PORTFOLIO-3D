import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields (name, email, message).' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid sender email address format.' }, { status: 400 });
    }

    // 2. Server-side environment variable inspection (logged on server only)
    const emailUser = process.env.EMAIL_USER || 'anshu.priya4748@gmail.com';
    const emailPass = process.env.EMAIL_PASS?.trim();
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'anshu.priya4748@gmail.com';

    console.log('\n--- [Nodemailer Contact Submission Debug] ---');
    console.log('[Runtime Env Check] EMAIL_USER defined:', Boolean(emailUser), `(${emailUser})`);
    console.log('[Runtime Env Check] EMAIL_PASS defined:', Boolean(emailPass), `(length: ${emailPass ? emailPass.length : 0})`);
    console.log('[Runtime Env Check] CONTACT_RECEIVER_EMAIL:', recipient);
    console.log('[Payload] Sender Name:', name);
    console.log('[Payload] Sender Email:', email);
    console.log('[Payload] Subject:', subject || `New Portfolio Contact from ${name}`);
    console.log('--------------------------------------------\n');

    if (!emailPass) {
      const errorMsg =
        'EMAIL_PASS is missing or empty. A 16-character Google App Password must be added to .env.local (and in deployment env settings).';
      console.error(`[Nodemailer Error] ${errorMsg}`);
      return NextResponse.json(
        {
          error: errorMsg,
          code: 'MISSING_EMAIL_PASS',
          instructions: 'Generate a 16-char App Password at myaccount.google.com/apppasswords and set EMAIL_PASS in .env.local',
        },
        { status: 500 }
      );
    }

    // 3. Configure Transporter with service: 'gmail'
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 4. Construct Mail Options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: recipient,
      replyTo: email,
      subject: subject || `[Portfolio Contact] Message from ${name}`,
      text: `New message from ${name} (${email}):\n\n${message}\n\nSent at: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #e63946; padding-bottom: 8px;">
            New Portfolio Message
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 80px;"><strong>From:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #e63946;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #e63946; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
            Sent directly from your Portfolio Contact Form • Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    };

    // 5. Send Mail (Awaited with full error capture)
    const info = await transporter.sendMail(mailOptions);
    console.log('[Nodemailer Success] Email delivered successfully! Message ID:', info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: 'Message delivered successfully to inbox!',
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('[Nodemailer Send Failure - Full Error Object]:', error);

    let clientMessage = 'Failed to deliver email.';
    if (error && typeof error === 'object' && 'code' in error) {
      const code = (error as { code?: string }).code;
      if (code === 'EAUTH') {
        clientMessage =
          'Authentication failed: Gmail rejected credentials. Make sure you are using a 16-character Google App Password (not your personal Gmail login password) with 2-Step Verification enabled.';
      } else if (code === 'ESOCKET' || code === 'ETIMEDOUT') {
        clientMessage = 'Network timeout connecting to Gmail SMTP server.';
      }
    } else if (error instanceof Error) {
      clientMessage = error.message;
    }

    return NextResponse.json(
      {
        error: clientMessage,
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const emailUser = process.env.EMAIL_USER || 'anshu.priya4748@gmail.com';
  const emailPass = process.env.EMAIL_PASS?.trim();
  const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'anshu.priya4748@gmail.com';

  return NextResponse.json({
    status: 'online',
    serverSide: true,
    transporter: 'gmail',
    emailUser,
    recipient,
    hasEmailPass: Boolean(emailPass),
    passLength: emailPass ? emailPass.length : 0,
  });
}
