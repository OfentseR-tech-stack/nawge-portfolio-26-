require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const videoRoutes = require('./routes/videoRoutes')
const contactRoutes = require('./routes/contactRoutes')
const commentRoutes = require('./routes/commentRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('NAWGE API is running'))

app.use('/api/videos', videoRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/comments', commentRoutes) // GET list of comments

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

})
