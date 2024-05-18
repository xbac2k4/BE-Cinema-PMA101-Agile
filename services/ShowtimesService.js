class ShowTimesService {
    getShowtimesByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const categories = await Category.find().skip(skip).limit(parseInt(limit));
            const totalCategories = await Category.countDocuments();
            const totalPages = Math.ceil(totalCategories / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách thể loại",
                data: {categories, totalPages}
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ShowTimesService;