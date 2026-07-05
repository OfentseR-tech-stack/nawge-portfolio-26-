const Comment = require('../models/Comment')

async function createComment(req, res, next) {
  try {
    const { username, comment, ownerId } = req.body
    if (!username || !comment || !ownerId) {
      return res.status(400).json({ error: 'username, comment, and ownerId are required.' })
    }
    const newComment = await Comment.create({ username, comment, ownerId })
    res.status(201).json(newComment)
  } catch (err) {
    next(err)
  }
}

async function getComments(req, res, next) {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 })
    res.json(comments)
  } catch (err) {
    next(err)
  }
}

async function deleteComment(req, res, next) {
  try {
    const { ownerId } = req.body
    const isLocalhost = req.hostname === 'localhost' || req.hostname === '127.0.0.1'

    const existing = await Comment.findById(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Comment not found.' })

    if (!isLocalhost && existing.ownerId !== ownerId) {
      return res.status(403).json({ error: 'You can only delete your own comments.' })
    }

    await existing.deleteOne()
    res.json({ message: 'Comment deleted.' })
  } catch (err) {
    next(err)
  }
}

module.exports = { createComment, getComments, deleteComment }