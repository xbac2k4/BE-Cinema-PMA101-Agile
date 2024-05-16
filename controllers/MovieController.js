const Movie = require("../models/Movie");

class MovieController {
    getAllMovie = async (req, res) => {
        try {
            const data = await Movie.find().populate('id_category');
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
    getMovieByPage = async (req, res, next) => {
        const { page, limit } = req.query;
        try {
            // const data = await Category.find().populate();
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const movies = await Movie.find().populate('id_category').skip(skip).limit(parseInt(limit));
            const totalMovie = await Movie.countDocuments();
            const totalPages = Math.ceil(totalMovie / parseInt(limit));
            // console.log('data: ', movies);
            res.json({
                status: 200,
                message: "Danh sách phim",
                data: { movies, totalPages }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MovieController;