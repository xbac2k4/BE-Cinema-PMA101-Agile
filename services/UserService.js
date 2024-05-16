const Users = require("../models/User");
const JWT = require('jsonwebtoken');
require('dotenv').config()

class UserService {
    login = async (email, password) => {
        try {
            const user = await Users.findOne({ email, password })
            if (user) {
                //Token người dùng sẽ sử dụng gửi lên trên header mỗi lần muốn gọi api
                const token = JWT.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                //Khi token hết hạn, người dùng sẽ call 1 api khác để lấy token mới
                //Lúc này người dùng sẽ truyền refreshToken lên để nhận về 1 cặp token,refreshToken mới
                //Nếu cả 2 token đều hết hạn người dùng sẽ phải thoát app và đăng nhập lại
                const refreshToken = JWT.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
                //expiresIn thời gian token
                return {
                    status: 200,
                    message: "Đăng nhâp thành công",
                    data: user,
                    token: token,
                    refreshToken: refreshToken
                }
            } else {
                // Nếu thêm không thành công result null, thông báo không thành công
                return {
                    status: 400,
                    message: "Lỗi, đăng nhập không thành công",
                    data: []
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService;