const { adminLogin, deletedUser, viewAllUser, updateUserProfile, viewUserProfile } = require('../controller/adminController');

const router = require('express').Router();

router.post('/adminLogin',adminLogin);
router.get('/user/delete/:id',deletedUser);
router.get('/view',viewAllUser);
router.get('/edit/:id',updateUserProfile);
router.get('/view/:id',viewUserProfile);

module.exports = router;
