# NAWGE Portfolio — Frontend

## Setup
```
cd client
npm install
npm run dev
```
Opens at http://localhost:5173

## What's included
- Hero, About (team grid), Blog (placeholder video cards), Contact (form UI), Comments (local-state UI), Footer
- Framer Motion animations: fade-up, stagger, scale, glow buttons, parallax hero zoom, scroll progress bar, mobile slide-in menu
- Tailwind theme with your palette (#111111 bg / #1A1A1A secondary / #FFFFFF accent / #999999 muted / #F44336 action)
- Fonts: Bebas Neue (headings), Poppins (body), Space Grotesk (alt)

## Not wired up yet (backend phase)
- Contact form posts to `/api/contact` — will show a friendly error until the Express server exists
- Comments fall back to local state until `/api/comment` exists
- Blog section uses placeholder video data — swap `placeholderVideos` in `src/components/Blog.jsx` for a real fetch once the YouTube API route is ready

## Images
Drop real images into `src/assets/images/`:
- `hero.jpg` — full-bleed hero background
- `about.jpg` — about section image
- `video1.jpg`, `video2.jpg` — blog thumbnails
