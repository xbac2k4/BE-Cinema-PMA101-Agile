const Users = require("../models/User");
const JWT = require('jsonwebtoken');
const SECRETKEY = "CINEMA"

class UserService {
    login = async (email, password) => {
        try {
            const user = await Users.findOne({ email, password })
            if (user) {
                //Token người dùng sẽ sử dụng gửi lên trên header mỗi lần muốn gọi api
                const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1h' });
                //Khi token hết hạn, người dùng sẽ call 1 api khác để lấy token mới
                //Lúc này người dùng sẽ truyền refreshToken lên để nhận về 1 cặp token,refreshToken mới
                //Nếu cả 2 token đều hết hạn người dùng sẽ phải thoát app và đăng nhập lại
                const refreshToken = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: '1d' })
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
    register = async (file, username, email, password, phone, roles, urlsImage) => {
        try {
            if (!file) {
                return {
                    status: 400,
                    message: "Không tìm thấy file",
                    data: []
                }
            }
            // console.log('data: ' + data);
            // console.log('file: ' + file);
            if (file) {
                const newUser = new Users({
                    username: username,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                    roles: roles,
                    avatar: urlsImage,
                });
                const result = await newUser.save();
                if (result) {
                    return {
                        status: 200,
                        message: "Thêm thành công",
                        data: result
                    };
                } else {
                    return {
                        status: 400,
                        message: "Lỗi, thêm không thành công",
                        data: []
                    };
                }
            }
        } catch (error) {
            console.error('Error:', error);
            return {
                status: -1,
                message: 'Internal server error',
                data: null
            };
        }
    }
    getUserByPage = async (page, limit) => {
        try {
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const users = await Users.find().skip(skip).limit(parseInt(limit));
            const totalUser = await Users.countDocuments();
            const totalPages = Math.ceil(totalUser / parseInt(limit));
            // console.log('data: ', data);
            return {
                status: 200,
                message: "Danh sách người dùng",
                data: {users, totalPages}
            }
        } catch (error) {
            console.log(error);
        }
    }
    deleteUser = async (id) => {
        try {
            const result = await Users.findByIdAndDelete(id);
            if (result) {
                return {
                    status: 200,
                    message: "Xóa thành công",
                    data: result
                };
            } else {
                return {
                    status: 400,
                    message: "Lỗi, xóa không thành công",
                    data: []
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService;