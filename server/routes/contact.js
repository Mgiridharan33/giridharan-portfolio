const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;

function validateContactPayload({ name, email, subject, message }) {
  const errors = [];

  if (!name || !name.trim()) errors.push("Name is required.");
  else if (name.length > MAX_NAME_LENGTH) errors.push("Name is too long.");

  if (!email || !email.trim()) errors.push("Email is required.");
  else if (!EMAIL_REGEX.test(email.trim())) errors.push("Please enter a valid email address.");

  if (!subject || !subject.trim()) errors.push("Subject is required.");
  else if (subject.length > MAX_SUBJECT_LENGTH) errors.push("Subject is too long.");

  if (!message || !message.trim()) errors.push("Message is required.");
  else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
  }

  return errors;
}

// Build the transporter lazily so a missing .env doesn't crash the whole server on boot
function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  const errors = validateContactPayload({ name, email, subject, message });
  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0], errors });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.CONTACT_EMAIL) {
    console.error("Missing SMTP configuration in .env");
    return res.status(503).json({ message: "The contact form is not configured on the server yet." });
  }

  try {
    const transporter = buildTransporter();
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br />");
    const replyUrl = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(`Re: ${subject.trim()}`)}`;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New portfolio enquiry: ${subject.trim()}`,
      text: [
        "NEW PORTFOLIO ENQUIRY",
        "Giridharan M | MERN Stack Developer",
        "",
        `From: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        "",
        "MESSAGE",
        message.trim(),
        "",
        `Reply to ${name.trim()}: ${replyUrl}`,
      ].join("\n"),
      html: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="color-scheme" content="light" />
            <title>New portfolio enquiry</title>
          </head>
          <body style="margin:0;padding:0;background-color:#eef2f5;font-family:Arial,Helvetica,sans-serif;color:#17212b;">
            <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
              New message from ${safeName} about ${safeSubject}.
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2f5;">
              <tr>
                <td align="center" style="padding:36px 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border:1px solid #dfe6eb;border-radius:12px;overflow:hidden;">
                    <tr>
                      <td style="padding:30px 36px;background-color:#101b27;border-bottom:3px solid #5eead4;">
                        <p style="margin:0 0 12px;color:#78dccc;font-size:11px;font-weight:bold;letter-spacing:2px;">PORTFOLIO &nbsp;/&nbsp; NEW ENQUIRY</p>
                        <h1 style="margin:0;color:#f5f8fa;font-size:25px;line-height:1.3;font-weight:700;">A new message for Giridharan</h1>
                        <p style="margin:9px 0 0;color:#b2c0cb;font-size:14px;line-height:1.6;">MERN Stack Developer &nbsp;·&nbsp; India</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px 36px 12px;">
                        <p style="margin:0 0 18px;color:#71808c;font-size:12px;font-weight:bold;letter-spacing:1.2px;">SENDER DETAILS</p>
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                          <tr>
                            <td width="108" style="padding:11px 0;border-bottom:1px solid #edf1f3;color:#75828d;font-size:13px;">Name</td>
                            <td style="padding:11px 0;border-bottom:1px solid #edf1f3;color:#17212b;font-size:14px;font-weight:bold;">${safeName}</td>
                          </tr>
                          <tr>
                            <td width="108" style="padding:11px 0;border-bottom:1px solid #edf1f3;color:#75828d;font-size:13px;">Email</td>
                            <td style="padding:11px 0;border-bottom:1px solid #edf1f3;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#087f78;text-decoration:none;">${safeEmail}</a></td>
                          </tr>
                          <tr>
                            <td width="108" style="padding:11px 0;color:#75828d;font-size:13px;vertical-align:top;">Subject</td>
                            <td style="padding:11px 0;color:#17212b;font-size:14px;font-weight:bold;">${safeSubject}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 36px 30px;">
                        <p style="margin:0 0 12px;color:#71808c;font-size:12px;font-weight:bold;letter-spacing:1.2px;">MESSAGE</p>
                        <div style="padding:20px 22px;background-color:#f5f8f9;border-left:3px solid #5eead4;border-radius:4px;color:#293742;font-size:15px;line-height:1.75;overflow-wrap:anywhere;">${safeMessage}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 36px 32px;">
                        <a href="${replyUrl}" style="display:inline-block;padding:13px 20px;background-color:#0e766e;border-radius:6px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to ${safeName}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 36px;background-color:#f7f9fa;border-top:1px solid #e8edef;color:#87939c;font-size:12px;line-height:1.6;">
                        Sent from the portfolio contact form for Giridharan M.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Nodemailer error:", err.message);
    return res.status(500).json({ message: "Unable to send your message. Please try again." });
  }
});

// Minimal HTML escaping so message content can't break the email markup
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = router;
