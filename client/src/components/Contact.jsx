import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding py-28 bg-bg2">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl mb-6">Contact</h2>
          <p className="text-muted mb-8">Business Enquiries</p>

          <div className="flex items-center gap-3 mb-4">
            <FaEnvelope className="text-action" />
            <span>info@nawge.co.za</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <FaInstagram className="text-action" />
            <span>@nawgeclips</span>
          </div>
          <div className="flex items-center gap-3">
            <FaYoutube className="text-action" />
            <span>nawgeclips</span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="bg-bg px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-bg px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
          />
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="bg-bg px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            required
            className="bg-bg px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-action"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="glow-btn bg-action px-6 py-3 rounded-md font-semibold uppercase text-sm w-fit"
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </motion.button>
          {status === 'sent' && <p className="text-green-400 text-sm">Message sent — thank you!</p>}
          {status === 'error' && (
            <p className="text-red-400 text-sm">Backend not connected yet — this will work once the API is live.</p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
