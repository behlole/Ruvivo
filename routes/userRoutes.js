const router = require('express').Router();
const userController = require('../controller/UserController');
const multer = require('multer');
const upload = multer({
    dest: '/uploads/',
});
router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
