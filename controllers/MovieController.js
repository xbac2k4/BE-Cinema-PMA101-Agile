const Movie = require("../models/Movie");

class MovieController {
    getAllMovie = async (req, res) => {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        if (!authHeader) {
            return res.sendStatus(401); // Kiểm tra xem header Authorization có tồn tại không
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.render('login', { title: 'LOGIN' }) // Kiểm tra xem token có tồn tại không
        }
        try {
            const payload = JWT.verify(token, SECRETKEY); // Xác thực token
            console.log(payload);
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
    getMovieByPage = async (req, res) => {
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