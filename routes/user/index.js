const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const Upload = require('../../config/common/upload');
// Movie
router.post('/login', new UserController().postLogin);
router.post('/register', Upload.single('image'), new UserController().postRegister);
router.get('/get-user-by-page', new UserController().getUserByPage);
router.get('/get-user-by-id/:id', new UserController().getUserByID);
router.get('/get-user', new UserController().getAllUser);
router.delete('/delete-user/:id', new UserController().deleteUser);

module.exports = router;
