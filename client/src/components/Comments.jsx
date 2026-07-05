import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiTrash } from 'react-icons/hi'
import axios from 'axios'

const CLIENT_ID_KEY = 'nawge_client_id'

function generateFallbackId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getClientId() {
  let id = localStorage.getItem(CLIENT_ID_KEY)
  if (!id) {
    id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : generateFallbackId()
    localStorage.setItem(CLIENT_ID_KEY, id)
  }
  return id
}

const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'

export default function Comments() {
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [status, setStatus] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const clientId = getClientId()

  useEffect(() => {
    axios.get('/api/comments')
      .then((res) => setComments(res.data))
      .catch(() => {})
  }, [])

  const canDelete = (c) => isLocalhost || c.ownerId === clientId

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await axios.post('/api/comment', { username, comment, ownerId: clientId })
      setComments([res.data, ...comments])
      setStatus('sent')
    } catch (err) {
      setComments([
        { _id: Date.now(), username, comment, ownerId: clientId, createdAt: new Date().toISOString() },
        ...comments,
      ])
      setStatus('local')
    }
    setUsername('')
    setComment('')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return
    setDeletingId(id)
    try {
      await axios.delete(`/api/comment/${id}`, { data: { ownerId: clientId } })
      setComments(comments.filter((c) => c._id !== id))
    } catch (err) {
      alert('Could not delete — make sure the server is running.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="section-padding py-20">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl mb-8"
      >
        Leave a Comment
      </motion.h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mb-12">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
          required
          className="bg-bg2 px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          rows={3}
          required
          className="bg-bg2 px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
        />
        <button
          type="submit"
          className="glow-btn bg-action px-6 py-3 rounded-md font-semibold uppercase text-sm w-fit"
        >
          {status === 'sending' ? 'Posting...' : 'Submit'}
        </button>
        {status === 'local' && (
          <p className="text-muted text-xs">Showing locally — backend not connected yet.</p>
        )}
      </form>

      <div className="flex flex-col gap-4 max-w-xl">
        <AnimatePresence>
          {comments.map((c) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-bg2 rounded-md p-4 flex items-start justify-between gap-4"
            >
              <div>
                <p className="font-medium">{c.username}</p>
                <p className="text-muted text-sm mt-1">{c.comment}</p>
                {c.createdAt && (
                  <p className="text-muted/50 text-xs mt-2">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {canDelete(c) && (
                <button
                  onClick={() => handleDelete(c._id)}
                  disabled={deletingId === c._id}
                  className="text-muted hover:text-action transition-colors mt-1 shrink-0"
                  aria-label="Delete comment"
                >
                  <HiTrash className="text-lg" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="text-muted text-sm">No comments yet — be the first.</p>
        )}
      </div>
    </section>
  )
}