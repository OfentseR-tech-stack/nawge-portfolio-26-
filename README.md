# NAWGE Portfolio — Full Stack Website

Official website for NAWGE, a creative collective of four filmmakers, photographers and storytellers based in South Africa.

**Live site:** [nawge.co.za](https://nawge.co.za)

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **APIs:** YouTube Data API v3, Resend (email)
- **Deployment:** Vercel (frontend), Render (backend)
- **DNS/Email:** Cloudflare

## Setup

### Client
```
cd client
npm install
npm run dev
```
Runs at http://localhost:5173

### Server
```
cd server
npm install
npm run dev
```
Runs at http://localhost:5000

### Environment Variables

Create a `.env` file in the `server` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
RESEND_API_KEY=your_resend_api_key
```

## Features

- Hero section with cinematic parallax zoom
- About section with slideshow and team grid
- Auto-updating YouTube videos and playlists
- Contact form connected to MongoDB + email notifications
- Comments section with delete functionality
- Instagram redirect link
- Mobile responsive with hamburger menu
- Scroll progress indicator
- Custom domain nawge.co.za

---

## ⚖️ Intellectual Property & Asset Allocation

This project operates under a split IP model to protect both the developer and the brand assets:

- **Codebase & Architecture:** Solely owned by Ofentse Ramatsetse. Licensed exclusively to NAWGE under the terms listed in `LICENSE.md`.
- **Brand Assets (Logo, Copy, Content):** Jointly owned by the NAWGE project and its four core partners.
- **Domain Ownership:** Registered and managed on behalf of the brand.

### Production Environment Security

To prevent security leaks and maintain configuration integrity:

1. Production environment variables (`.env`) must never be committed to Git.
2. Deployment hooks are linked to the `main` branch, which requires code review and admin approval from the primary author before deployment.

See `LICENSE.md` for full terms.
