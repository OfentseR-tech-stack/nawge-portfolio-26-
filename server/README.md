# NAWGE Portfolio — Backend

## Setup
```
cd server
npm install
npm run dev
```
Runs on http://localhost:5000

Your `.env` already has the YouTube API key and channel ID filled in.
`MONGO_URI` and `INSTAGRAM_ACCESS_TOKEN` are still placeholders — contact/comments
routes will respond with a friendly error until MONGO_URI is set.

## Routes
- `GET  /api/videos` — latest 2 YouTube uploads (cached 30 min to save quota)
- `POST /api/contact` — { name, email, subject, message } → saved to MongoDB
- `POST /api/comment` — { username, comment } → saved to MongoDB
- `GET  /api/comments` — list of comments, newest first

## Running both client + server together
Open two terminals:
```
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```
The Vite dev server proxies `/api/*` requests to `localhost:5000` (see `client/vite.config.js`),
so the frontend's axios calls just work without CORS headaches.

## Security note
Never commit `.env` — it's already in `.gitignore`. If a key is ever exposed
(e.g. pasted somewhere public), regenerate it in Google Cloud Console immediately.
