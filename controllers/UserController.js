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
}

module.exports = UserController;
