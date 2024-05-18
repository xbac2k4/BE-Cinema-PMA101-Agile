const Upload = require('../../config/common/upload')
const express = require('express');
const ShowtimesController = require("../../controllers/ShowtimesController");
const router = express.Router();

router.get('/get-showtimes-by-page', new ShowtimesController().getShowtimesByPage);
router.get('/get-showtimes', new ShowtimesController().getAllShowtimes);

module.exports = router;
