const mongoose = require('mongoose')

async function connectDB() {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb')) {
    console.warn('MONGO_URI not set — skipping database connection (contact/comments routes will fail until it is).')
    return
  }
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
  }
}

module.exports = connectDB
