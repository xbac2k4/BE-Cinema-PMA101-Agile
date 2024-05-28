const Upload = require('../../config/common/upload')
const express = require('express');
const ShowtimesController = require("../../controllers/ShowtimesController");
const router = express.Router();

router.get('/get-showtimes-by-page', new ShowtimesController().getShowtimesByPage);
router.get('/get-showtimes', new ShowtimesController().getAllShowtimes);
router.get('/get-showtimes-by-id/:id', new ShowtimesController().getShowtimesByID);
router.post('/add-showtimes', new ShowtimesController().addShowtimes);
router.put('/update-showtimes/:id', new ShowtimesController().updateShowtimes);
router.delete('/delete-showtimes/:id', new ShowtimesController().deleteShowtimes);

module.exports = router;
