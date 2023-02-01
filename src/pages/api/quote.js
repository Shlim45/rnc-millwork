import sendEmail from '@/utils/email'
import { isInDevMode } from '@/config'

function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for all fields,
    // and returns early if they are not found

    if (!body.name || !body.phone || !body.email || !body.subject || !body.description) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Form incomplete.' })
    }

    const text = `
    FROM:  ${body.email} (${body.name})
    PHONE: ${body.phone}

    SUBJECT: ${body.subject}

    ${body.description}
    `;

    // Send email ONLY IN DEV MODE FOR NOW
    if (isInDevMode()) {
        sendEmail(body.subject, text);
    }

    // Sends a HTTP success code
    res.status(200).json({ data: `${text}` })
}

export default handler