const axios = require('axios')

let cache = { videos: null, playlists: null, fetchedAt: 0 }
const CACHE_TTL_MS = 1000 * 60 * 5 // 5 minutes

// Existing: get latest public videos
async function getLatestVideos(req, res) {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return res.status(500).json({ error: 'YouTube API key or channel ID not configured.' })
  }

  const now = Date.now()
  if (cache.videos && now - cache.fetchedAt < CACHE_TTL_MS) {
    return res.json(cache.videos)
  }

  try {
    const searchUrl = 'https://www.googleapis.com/youtube/v3/search'
    const { data: searchData } = await axios.get(searchUrl, {
      params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults: 5,
        type: 'video',
        videoEmbeddable: 'true',
        videoSyndicated: 'true',
      },
    })

    const videoIds = searchData.items.map(item => item.id.videoId).join(',')
    const videosUrl = 'https://www.googleapis.com/youtube/v3/videos'
    const { data: videosData } = await axios.get(videosUrl, {
      params: {
        key: YOUTUBE_API_KEY,
        id: videoIds,
        part: 'snippet,status',
      },
    })

    const publicVideos = videosData.items
      .filter(v => v.status.privacyStatus === 'public')
      .map(v => ({
        id: v.id,
        title: v.snippet.title,
        description: v.snippet.description,
        thumbnail: v.snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${v.id}`,
      }))

    cache.videos = publicVideos
    cache.fetchedAt = now
    res.json(publicVideos)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos', details: error.message })
  }
}

// New: get playlists
async function getPlaylists(req, res) {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return res.status(500).json({ error: 'YouTube API key or channel ID not configured.' })
  }

  const now = Date.now()
  if (cache.playlists && now - cache.fetchedAt < CACHE_TTL_MS) {
    return res.json(cache.playlists)
  }

  try {
    const playlistsUrl = 'https://www.googleapis.com/youtube/v3/playlists'
    const { data } = await axios.get(playlistsUrl, {
      params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: 'snippet',
        maxResults: 5,
      },
    })

    const playlists = data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/playlist?list=${item.id}`,
    }))

    cache.playlists = playlists
    cache.fetchedAt = now
    res.json(playlists)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch playlists', details: error.message })
  }
}

module.exports = { getLatestVideos, getPlaylists }
