import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="section-padding py-10 bg-bg2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
      <span className="font-heading text-xl tracking-widest">NAWGE</span>
      <p className="text-muted text-xs">© {new Date().getFullYear()} NAWGE. All rights reserved.
        <a href="/privacy" className="text-muted text-xs hover:text-accent transition-colors">
  Privacy Policy
</a>
<a href="/terms" className="hover:text-accent transition-colors">.Terms of Use.</a>
      </p>
      <div className="flex gap-5 text-lg">
        <a href="https://www.instagram.com/nawgeclips/" target="_blank" rel="noreferrer" className="hover:text-action">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/@nawgeclips" target="_blank" rel="noreferrer" className="hover:text-action">
          <FaYoutube />
        </a>
        <a href="https://www.tiktok.com/@nawgeclipss" target="_blank" rel="noreferrer" className="hover:text-action">
          <FaTiktok />
        </a>
        
      </div>
    </footer>
  )
}
