const router = require('express').Router();
const jwt = require('jsonwebtoken');
const postController = require('../controller/postController');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({
    storage: storage,
});
router.get('/', authMiddleware, postController.index);
router.post('/', upload.single('imageFile'), authMiddleware, postController.create);
router.get('/delete', authMiddleware, postController.delete);

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.send({
            "message": "Un Authorized"
        }, 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.body.UserId = user.userId
        console.log(req.body);
        next()
    });
}

module.exports = router;
