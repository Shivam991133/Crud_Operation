const { login,signup, viewProfile } = require('../controller/userController')
const router = require('express').Router()
const uploads = require('../middleware/multer')

router.post('/upload',uploads.single('file'),signup)
router.post('/login',login);
router.get('/user/view/:id',viewProfile);


module.exports = router;
