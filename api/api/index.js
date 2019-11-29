const express = require('express');
const cors = require('cors');
const captionRouter = require('./routes/captions');
const videoRouter = require('./routes/videos');

const app = express();
const router = express.Router();
router.use(cors());
router.options('*', cors());

app.listen(3002, () => {
    console.log("Server running on port 3002");
});

router.use('/captions', captionRouter.router)
router.use('/videos', videoRouter.router)
app.use('/ppg-api', router)
