import { motion } from 'framer-motion'
import { FaYoutube } from 'react-icons/fa'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:[
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('/images/hero.JPEG')",

          ]
        }}  
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 18, repeat: 1, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 text-center section-padding"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="font-heading text-6xl md:text-8xl tracking-wider">
          <img src="/IMG_2833.PNG" alt="Logo" className="h-20 w-40 rounded-full mx-auto mb-4 touch-action-none pointer-events-none" draggable="false"  />
          {/* <img src="/IMG_3443.PNG" alt="Logo" className="h-20 w-40  mx-auto mb-4" /> */}


        </h1>
        <p className="font-alt text-muted mt-3 text-lg md:text-xl">CREATIVE COLLECTIVE</p>  
        <p className="font-body text-sm md:text-base mt-2 text-accent/70">
          Vlogs · Media · Photography · Storytelling · Creative Direction
        </p>

        <motion.a
          //link that directs to the youtube channel
          href="https://youtube.com/@nawgeclips?sub_confirmation=1"
          rel="noreferrer" className="glow-btn inline-flex items-center gap-2 bg-action px-6 py-3 rounded-full mt-8 font-semibold uppercase text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <FaYoutube /> Watch on YouTube
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
      </motion.div>
    </section>
  )
}
