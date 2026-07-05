import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Comments from './components/Comments'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Privacy from './components/Privacy'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setScrollPct(pct || 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <BrowserRouter>
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 h-1 bg-action z-[70]"
        style={{ width: `${scrollPct}%` }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Blog />
        <Contact />
        <Comments />
      </main>
      <Footer />
    </>
    </BrowserRouter>
  )
}
