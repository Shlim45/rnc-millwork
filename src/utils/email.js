const sgMail = require('@sendgrid/mail');

export default async function sendEmail(subject, text) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: process.env.SENDGRID_RECIPIENT_EMAIL, // ['r1@email.com','r2@email.com', ...]
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: `QUOTE REQUEST: ${subject}`,
        text
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}
