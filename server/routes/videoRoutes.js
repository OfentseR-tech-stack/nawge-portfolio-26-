const express = require('express')
const router = express.Router()
const { getLatestVideos, getPlaylists } = require('../controllers/videoController')

router.get('/', getLatestVideos)
router.get('/playlists', getPlaylists)

module.exports = router
