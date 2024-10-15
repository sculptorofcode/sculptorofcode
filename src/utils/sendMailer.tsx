import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export default async function SendMailer(
    email: string,
    subject: string,
    html: string,
    react?: any,
) {
    const resend = new Resend(API_KEY);

    const mail = await resend.emails.send({
        from: "Codes Engineer <noreply@codes.engineer>",
        replyTo: CONTACT_EMAIL,
        to: email,
        subject: subject,
        html: html,
    });

    return mail;
}
