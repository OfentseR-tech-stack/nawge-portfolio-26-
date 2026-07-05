const Contact = require('../models/Contact')
const { Resend } = require('resend')

async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required.' })
    }

    const contact = await Contact.create({ name, email, subject, message })
    console.log('Contact saved:', name, email)

    if (process.env.RESEND_API_KEY) {
      console.log('Attempting to send email via Resend...')
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'NAWGE Contact Form <info@nawge.co.za>',
          to: 'info@nawge.co.za',
          reply_to: email,
          subject: `New message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        })
        console.log('Email sent successfully via Resend')
      } catch (emailErr) {
        console.error('Resend email failed:', emailErr.message)
      }
    } else {
      console.warn('RESEND_API_KEY not set - skipping email')
    }

    res.status(201).json(contact)
  } catch (err) {
    next(err)
  }
}

module.exports = { createContact }