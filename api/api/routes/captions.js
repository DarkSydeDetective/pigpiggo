const express = require('express');
const router = express.Router();
const captionController = require('../controllers/captions');
router.get('/', captionController.getCaptions);
exports.router = router