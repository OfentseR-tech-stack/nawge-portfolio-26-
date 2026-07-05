import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'
import axios from 'axios'

export default function Blog() {
  const [videos, setVideos] = useState([])
  const [playlists, setPlaylists] = useState([])
useEffect(() => {
  const apiUrl = import.meta.env.VITE_API_URL || ''
  axios
    .get(`${apiUrl}/api/videos`)
    .then((res) => {
      if (Array.isArray(res.data) && res.data.length) setVideos(res.data)
    })
    .catch(() => {})
    axios.get(`${apiUrl}/api/videos/playlists`)
      .then(res => {
        if (Array.isArray(res.data)) setPlaylists(res.data)
      })
      .catch(() => {})
}, [])
 
  return (
    <section id="blog" className="section-padding py-28">
      {/* Latest Videos */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl mb-12 text-center"
      >
        Latest Videos
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {videos.map((v, i) => (
          <motion.a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="block bg-bg2 rounded-lg overflow-hidden group"
          >
            <div
              className="aspect-video bg-cover bg-center bg-[#222] transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${v.thumbnail})` }}
            />
            <div className="p-5">
              <p className="font-body font-medium">{v.title}</p>
              <p className="text-muted text-xs mt-1">{v.description}</p>
              <p className="text-action text-sm mt-3 font-semibold uppercase">Watch →</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Playlists */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl mt-20 mb-12 text-center"
      >
        Playlists
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {playlists.map((pl, i) => (
          <motion.a
            key={pl.id}
            href={pl.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="block bg-bg2 rounded-lg overflow-hidden group"
          >
            <div
              className="aspect-video bg-cover bg-center bg-[#222] transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${pl.thumbnail})` }}
            />
            <div className="p-5">
              <p className="font-body font-medium">{pl.title}</p>
              <p className="text-muted text-xs mt-1">{pl.description}</p>
              <p className="text-action text-sm mt-3 font-semibold uppercase">View Playlist →</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Instagram Section */}
      <motion.a
  href="https://www.instagram.com/nawgeclips/"
  target="_blank"
  rel="noreferrer"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ scale: 1.02 }}
  className="glow-btn mt-16 bg-bg2 rounded-lg p-6 flex items-center gap-4 hover:bg-bg2/80 transition-colors"
>
  <FaInstagram className="text-3xl text-action" />
  <div>
    <p className="font-body font-medium">See more on Instagram</p>
    <p className="text-muted text-xs">@nawgeclips — tap to follow</p>
  </div>
</motion.a>
    </section>
  )
}
