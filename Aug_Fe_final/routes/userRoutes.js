const express =require('express')

const router = express.Router()

const authController = require('../controllers/authController');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/').get(authController.isLoggedIn, authController.getUser)

// router.route('/:id')
//     .patch(authController.isLoggedIn, authController.likePost )

module.exports = router;