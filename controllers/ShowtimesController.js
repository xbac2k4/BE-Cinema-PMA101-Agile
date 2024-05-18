const Room = require("../models/Room");
const Showtimes = require("../models/Showtimes");
const Time = require("../models/Time");

class ShowTimesController {
    getAllShowtimes = async (req, res) => {
        try {
            const data = await Showtimes.find().populate('id_room').populate('id_time').populate('id_movie');
            // console.log('data: ', data);
            res.json({
                "status": 200,
                "messenger": "Danh sách phim",
                "data": data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByPage = async (req, res, next) => {
        const { page, limit } = req.query;
        try {
            // const data = await Category.find().populate();
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const showtime = await Showtimes.find().populate('id_room').populate('id_time').populate('id_movie').skip(skip).limit(parseInt(limit));
            const totalShowtimes = await Showtimes.countDocuments();
            const totalPages = Math.ceil(totalShowtimes / parseInt(limit));
            // console.log('data: ', movies);
            res.json({
                status: 200,
                message: "Danh sách phim",
                data: { showtime, totalPages }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ShowTimesController;