import SendMailer from "@/utils/sendMailer";
import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export async function POST(req: NextRequest) {
    const { name, email, reason, message } = await req.json();

    const notificationTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #e2e8f0; background-color: #1a202c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { 
          background: linear-gradient(to right, #3b82f6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center; 
          font-weight: 700; 
          font-size: 24px; 
          margin-bottom: 30px; 
        }
        .info, .message { background-color: #2d3748; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        h2 { color: #3b82f6; font-weight: 600; font-size: 18px; margin-top: 0; }
        p { margin: 10px 0; }
        strong { color: #9333ea; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Contact Form Submission</h1>
        <div class="info">
          <h2>Sender Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>From:</strong> Portfolio</p>
        </div>
        <div class="message">
          <h2>Message Content</h2>
          <p>${message}</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const autoReplyTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #e2e8f0; background-color: #1a202c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { 
          background: linear-gradient(to right, #3b82f6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center; 
          font-weight: 700; 
          font-size: 24px; 
          margin-bottom: 30px; 
        }
        .message { background-color: #2d3748; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        h2 { color: #3b82f6; font-weight: 600; font-size: 18px; margin-top: 0; }
        p { margin: 10px 0; }
        .highlight { background-color: #4a5568; padding: 15px; border-radius: 5px; margin-top: 20px; }
        strong { color: #9333ea; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank You for Contacting Us</h1>
        <div class="message">
          <p>Dear ${name},</p>
          <p>We have received your message and appreciate you taking the time to reach out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
          <div class="highlight">
            <h2>Your Message Summary</h2>
            <p><strong>Reason:</strong> ${reason}</p>
            <p><strong>Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? "..." : ""
        }</p>
          </div>
          <p>If you have any additional information to provide, please don't hesitate to reply to this email.</p>
          <p>Best regards,<br>Saikat Roy</p>
        </div>
      </div>
    </body>
    </html>
  `;

    try {
        await SendMailer(
            CONTACT_EMAIL!,
            `New Contact: ${reason}`,
            notificationTemplate
        );
        await SendMailer(email, "Thank you for contacting us", autoReplyTemplate);
        return NextResponse.json("Email sent successfully", { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json("Error sending email", { status: 500 });
    }
}