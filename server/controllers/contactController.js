const Contact = require('../models/Contact')

async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required.' })
    }
    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json(contact)
  } catch (err) {
    next(err)
  }
}

module.exports = { createContact }
