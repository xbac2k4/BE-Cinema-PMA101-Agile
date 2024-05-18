const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
// Movie
router.post('/login', new UserController().postLogin);
router.get('/get-user-by-page', new UserController().getUserByPage);

// router.post('/register', new UserController().postRegister);

module.exports = router;
