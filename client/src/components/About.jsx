import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import SCXTT from '../assets/images/SCXTT.jpg'
import SHONN from '../assets/images/SHONN.jpg'
import AJ from '../assets/images/AJ.jpg'
import FL4IR from '../assets/images/FL4IR.jpg'
import { useState, useEffect } from 'react'

const team = [
  { name: '$CXTT', role: 'Media Manager/HOST' ,image:SCXTT , insta: 'https://www.instagram.com/versatile.scxtt', youtube: 'https://www.youtube.com/@nawgeclips'},
  { name: '$HONN', role: 'Marketing Manager/HOST',image:SHONN ,insta: 'https://www.instagram.com/ihateshonn/', youtube: 'https://www.youtube.com/@nawgeclips'},
  { name: 'AJ', role: 'Content Director/HOST',image:AJ ,insta: 'https://www.instagram.com/goinback2.aj/', youtube: 'https://www.youtube.com/@nawgeclips'},
  { name: 'FL4IR', role: 'Editor/Photographer',image:FL4IR, insta: 'https://www.instagram.com/fl4ir.boy/', youtube: 'https://www.youtube.com/@nawgeclips'},
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

// Slideshow images
const slideshowImages = [
  "/src/assets/images/AJxWillow.jpeg",
  "/src/assets/images/WilloxFl4ir.jpeg",
  "/src/assets/images/ScxttxAJ.jpeg",
]

export default function About() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 3000) // change every 3 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="section-padding py-28 bg-bg2">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Slideshow Section */}
        <motion.div
          key={index} // triggers animation when image changes
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="aspect-[4/5] bg-cover bg-center mono  rounded-md"
          style={{ backgroundImage: `url(${slideshowImages[index]})` }}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp} className="font-heading text-4xl mb-4">
            About
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="font-body text-muted leading-relaxed">
            We are a creative collective of four Artistic Directors who are dedicated to creating cinematic visual experiences that captivate and inspire audiences. Our team is passionate about pushing the boundaries of visual storytelling, and we strive to create content that is both visually stunning and emotionally impactful. With a focus on collaboration and innovation, we are committed to delivering exceptional work that exceeds expectations.
          </motion.p>
          <motion.p variants={fadeUp} custom={2} className="font-alt text-accent/30 mt-2 italic opacity-50">
            "Every frame tells a story."
          </motion.p>
{/* Vision Statement */}
<br />
          <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="font-heading text-2xl mb-4">Our Vision</h2>
    <p className="font-body text-muted leading-relaxed">
      Within our first month of releasing under our parent platform
        <a href="https://youtube.com/@versatileentsa?si=QSSlnoBKNzpUdGAT" whileHover={{ scale: 1.05 }} className="text-accent glow-focus hover:underline">
          @versatileENT_SA 
        </a>,
       NAWGE has already been able to capture thousands of views and impressions. 
      We’re building a creative hub that blends cinematic visuals with authentic storytelling, 
      and we’re now open to collaborating with brands and creators in various capacities as we believe that through collaboration and creativity, we can help amplify their message. 
      <p className="font-alt text-accent/60 mt-2 italic opacity-50" font-size="1.25rem">
              "We believe that through our work, we can inspire, entertain, and connect with audiences on a deeper level and that our vision will continue to evolve as we grow and expand our creative endeavors."
      </p>
    </p>
   
  </motion.p>
  <br />
    {/* Metrics Block */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-2 gap-6 text-center"
  >
    <div>
      <h3 className="text-3xl font-bold text-accent">70+</h3>
      <p className="text-muted">YT Subscribers</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-accent">12K</h3>
      <p className="text-muted">YT Impressions</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-accent">5.9K</h3>
      <p className="text-muted">Shorts Views</p>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-accent">12K</h3>
      <p className="text-muted">Instagram Profile Views</p>
    </div>
  </motion.div>
        </motion.div>
         
  
        
      </div>
      <br />
      <div className="grid md:grid-cols-1 gap-12 items-center">
 

</div>


      <div className="mt-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl mb-10 text-center"
        >
          Meet the Team
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              style={{ backgroundImage: `url(${m.image})` }}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.04 }}
              className="bg-bg rounded-lg p-4 text-center"
            >
              <img src={m.image} alt={m.name} className="rounded-md mb-2"/>
              <p className="font-body font-medium">{m.name}</p>
              <p className="text-muted text-xs uppercase">{m.role}</p>
              <div className="flex justify-center gap-3 mt-2 text-accent/70">
                <a href={m.insta} target="_blank" rel="noreferrer">
                  <FaInstagram className="hover:text-action cursor-pointer" />
                </a>
                <a href={m.youtube} target="_blank" rel="noreferrer">
                  <FaYoutube className="hover:text-action cursor-pointer" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
