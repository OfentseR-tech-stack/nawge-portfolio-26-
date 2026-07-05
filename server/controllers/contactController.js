const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required.' })
    }

    const contact = await Contact.create({ name, email, subject, message })
    console.log('Contact saved:', name, email)

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Attempting to send email..')
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: '"NAWGE Contact Form" <' + process.env.EMAIL_USER + '>',
          to: 'info@nawge.co.za',
          replyTo: email,
          subject: 'New message from ' + name,
          html: '<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ' + name + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Subject:</strong> ' + (subject || 'N/A') + '</p><p><strong>Message:</strong></p><p>' + message + '</p>',
        })
        console.log('Email sent successfully')
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr.message)
      }
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not set - skipping email')
    }

    res.status(201).json(contact)
  } catch (err) {
    next(err)
  }
}

module.exports = { createContact }
const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required.' })
    }

    const contact = await Contact.create({ name, email, subject, message })
    console.log('Contact saved:', name, email)

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('Attempting to send email..')
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: '"NAWGE Contact Form" <' + process.env.EMAIL_USER + '>',
          to: 'info@nawge.co.za',
          replyTo: email,
          subject: 'New message from ' + name,
          html: '<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ' + name + '</p><p><strong>Email:</strong> ' + email + '</p><p><strong>Subject:</strong> ' + (subject || 'N/A') + '</p><p><strong>Message:</strong></p><p>' + message + '</p>',
        })
        console.log('Email sent successfully')
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr.message)
      }
    } else {
      console.warn('EMAIL_USER or EMAIL_PASS not set - skipping email')
    }

    res.status(201).json(contact)
  } catch (err) {
    next(err)
  }
}

module.exports = { createContact }
