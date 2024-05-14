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
}

module.exports = UserController;
