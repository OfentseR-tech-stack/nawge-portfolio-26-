import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'

const links = ['Home', 'About', 'Blog', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 section-padding flex items-center justify-between py-4 transition-all duration-300 ${
          scrolled ? 'bg-bg/70 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <span className="font-heading text-2xl tracking-widest cursor-pointer" onClick={() => scrollTo('home')}>
          <img src="/IMG_2833.PNG" alt="Logo" className="h-10 w-20 rounded-full select-none pointer-events-none touch"  onContextMenu={(e) => e.preventDefault()} draggable="false" />
        </span>

        <div className="hidden md:flex items-center gap-10 font-body text-sm uppercase tracking-wide">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-accent/80 hover:text-accent transition-colors"
            >
              {l}
            </button>
          ))}
          <a
            href="https://www.youtube.com/@nawgeclips"
            target="_blank"
            rel="noreferrer"
            className="glow-btn flex items-center gap-2 bg-action px-4 py-2 rounded-full text-xs font-semibold uppercase"
          >
            <FaYoutube /> YouTube
          </a>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setOpen(true)} aria-label="Open menu">
          <HiMenu />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-3/4 bg-bg2 z-[60] flex flex-col gap-8 p-8"
          >
            <button className="self-end text-2xl mb-6" onClick={() => setOpen(false)} aria-label="Close menu">
              <HiX />
            </button>
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="font-heading text-3xl text-left text-accent/90 hover:text-action transition-colors"
              >
                {l}
              </button>
            ))}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="glow-btn mt-4 flex items-center gap-2 bg-action px-4 py-3 rounded-full text-sm font-semibold uppercase w-fit"
            >
              <FaYoutube /> YouTube
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
