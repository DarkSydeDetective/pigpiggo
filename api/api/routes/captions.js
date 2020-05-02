const express = require('express');
const router = express.Router();
const captionController = require('../controllers/captions');
router.get('/search', captionController.getSearchResults);
router.get('/trend', captionController.getTrend);
exports.router = router;
