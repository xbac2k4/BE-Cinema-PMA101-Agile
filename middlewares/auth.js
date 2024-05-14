const jwt = require('jsonwebtoken');
const secretKey = 'CINEMA'; // Thay bằng secret key của bạn

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.token;

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
