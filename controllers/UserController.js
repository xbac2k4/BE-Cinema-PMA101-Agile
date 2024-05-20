const User = require("../models/User");
const UserService = require("../services/UserService");

class UserController {
    postLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await new UserService().login(email, password);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data,
                token: data.token,
                refreshToken: data.refreshToken
            })
        } catch (error) {
            console.log(error);
        }
    }
    postRegister = async (req, res) => {
        try {
            const file = req.file;
            // console.log(`file: ${file}`);
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const phone = req.body.phoneNumber;
            const roles = req.body.role;
            const urlsImage = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
            const data = await new UserService().register(file, username, email, password, phone, roles, urlsImage);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    getAllUser =  async (req, res) => {
        try {
            const data = await User.find().populate();
            // console.log('data: ', data);
            res.json({
                status: 200,
                message: "Danh sách thể loại",
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getUserByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new UserService().getUserByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getUserByID = async (req, res, next) => {
        const { id } = req.params;
        try {
            const data = await new UserService().getUserByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.error('Error fetching movie', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await new UserService().deleteUser(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
}

module.exports = UserController;
