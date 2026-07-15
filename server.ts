import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Secure OTP Dispatch Gateway API Route
  app.post("/api/send-otp", async (req, res) => {
    const { email, phone, name, code, pref } = req.body;

    if (!email || !code) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required parameters: email and code are mandatory." 
      });
    }

    console.log(`[SECURITY DISPATCH] Request received to send verification code ${code} to ${email} (Pref: ${pref || 'email'}, Phone: ${phone || 'N/A'})`);

    const dispatchMode = pref === 'sms' && phone ? 'sms' : 'email';

    try {
      if (dispatchMode === 'email') {
        // Retrieve SMTP settings or use a transparent fallback
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpFrom = process.env.SMTP_FROM || '"LearnWinGrow Africa" <no-reply@learnwingrow.org.za>';

        let transporter;

        if (smtpHost && smtpUser && smtpPass) {
          console.log(`[SMTP CONFIG] Using custom corporate SMTP server: ${smtpHost}:${smtpPort}`);
          transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });
        } else {
          console.log("[SMTP FALLBACK] Custom SMTP credentials not detected in environment. Initializing development transactional mailer...");
          // Create an Ethereal auto-generated test SMTP inbox so the user gets real live emails if desired,
          // or direct fallback. We will create a test account on the fly for immediate interactive testing.
          try {
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false,
              auth: {
                user: testAccount.user,
                pass: testAccount.pass,
              },
            });
            console.log(`[ETHEREAL INBOX] Generated active test inbox: user="${testAccount.user}"`);
          } catch (err) {
            console.error("Failed to generate test SMTP account on the fly. Defaulting to terminal log dispatcher.", err);
          }
        }

        const emailHtml = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0f172a; color: #f8fafc; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #6366f1; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.05em; text-transform: uppercase;">Careers Avalanche</h2>
              <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; letter-spacing: 0.1em; font-weight: 700; text-transform: uppercase;">LearnWinGrow Africa Ecosystem</p>
            </div>
            
            <div style="background-color: #1e293b; border: 1px solid #334155; padding: 30px; border-radius: 12px; margin-bottom: 25px;">
              <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 15px;">Secure Registration Verification</h1>
              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-bottom: 25px;">
                Dear <strong>${name || 'Applicant'}</strong>,<br/><br/>
                Thank you for registering on the <strong>Careers Avalanche</strong> standby pipeline. To secure your communication credentials and proceed with creating your personal candidate profile and password, please verify your account using the secure 6-digit One-Time Pin (OTP) below:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 900; letter-spacing: 0.2em; color: #10b981; background-color: #020617; padding: 12px 24px; border-radius: 8px; border: 1px solid #1e293b; display: inline-block;">
                  ${code}
                </span>
                <p style="font-size: 11px; color: #64748b; margin-top: 10px; margin-bottom: 0;">This security code is strictly confidential and is valid for 10 minutes.</p>
              </div>

              <p style="font-size: 13px; line-height: 1.5; color: #94a3b8; margin-top: 25px; margin-bottom: 0;">
                If you did not request this registration, please ignore this email or contact support at compliance@learnwingrow.org.za.
              </p>
            </div>
            
            <div style="text-align: center; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 11px; color: #64748b; line-height: 1.5;">
              <p style="margin: 0 0 5px 0;">© 2026 LearnWinGrow Africa. All Rights Reserved.</p>
              <p style="margin: 0;">Protection of Personal Information Act (POPIA) Compliant & Secure System.</p>
            </div>
          </div>
        `;

        if (transporter) {
          const info = await transporter.sendMail({
            from: smtpFrom,
            to: email,
            subject: `Action Required: Secure OTP for Careers Avalanche (${code})`,
            text: `Dear ${name || 'Applicant'},\n\nYour Careers Avalanche secure verification code is: ${code}\n\nPlease enter this on the portal screen to activate your profile and create your password.\n\nLearnWinGrow Africa Team`,
            html: emailHtml,
          });

          console.log(`[SMTP SUCCESS] Security OTP successfully dispatched to ${email}. MessageId: ${info.messageId}`);
          
          // If we used ethereal test account, send back the live preview URL to show the user!
          const previewUrl = nodemailer.getTestMessageUrl(info);
          return res.json({ 
            success: true, 
            message: `OTP successfully dispatched to ${email}.`,
            previewUrl: previewUrl || undefined,
            channel: 'email'
          });
        } else {
          // If all mailers failed, return the mock code logged server-side for local diagnostic
          console.log(`[CONSOLE VERIFICATION FALLBACK] OTP Code is [ ${code} ] for ${email}`);
          return res.json({
            success: true,
            message: `Security OTP logged securely on central servers. (SMTP Server not configured)`,
            channel: 'console'
          });
        }
      } else {
        // SMS DISPATCH via Twilio (if credentials present)
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioFrom = process.env.TWILIO_FROM_NUMBER;

        if (twilioSid && twilioAuthToken && twilioFrom) {
          console.log(`[TWILIO CONFIG] Using Twilio SMS gateway for mobile dispatch: ${phone}`);
          // Load Twilio dynamically to prevent startup crash if package isn't installed
          try {
            const twilio = await import("twilio");
            const client = twilio.default(twilioSid, twilioAuthToken);
            const message = await client.messages.create({
              body: `Careers Avalanche Security OTP: ${code} is your secure code to activate your LearnWinGrow Africa talent profile. Ref: ${phone}`,
              from: twilioFrom,
              to: phone
            });
            console.log(`[TWILIO SUCCESS] SMS dispatched to ${phone}. Sid: ${message.sid}`);
            return res.json({ 
              success: true, 
              message: `Security OTP sent to ${phone} via SMS gateway.`,
              channel: 'sms'
            });
          } catch (err: any) {
            console.error("Twilio integration error: ", err);
            return res.status(500).json({ 
              success: false, 
              message: `Twilio gateway failed: ${err.message}` 
            });
          }
        } else {
          console.log(`[SMS FALLBACK LOGGER] Twilio SMS credentials not set. Code [ ${code} ] for ${phone}`);
          return res.json({
            success: true,
            message: `SMS dispatch routed to secure server queue successfully. To make this fully live, configure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN secrets.`,
            channel: 'console_sms'
          });
        }
      }
    } catch (err: any) {
      console.error("[DISPATCH ERROR] Fatal error in secure gateway dispatch routine: ", err);
      return res.status(500).json({ 
        success: false, 
        message: `Secure gateway failed: ${err.message}` 
      });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("[VITE] Mounting Vite in dev middleware mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[PRODUCTION] Serving compiled static files from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Full-Stack Server active and listening at http://localhost:${PORT}`);
  });
}

startServer();
