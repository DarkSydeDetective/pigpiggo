const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videos');
router.get('/', videosController.getVideos);
exports.router = router