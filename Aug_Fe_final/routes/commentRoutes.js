const express = require('express')
const commentController = require('./../controllers/commentController')
const authController = require('./../controllers/authController')


const router = express.Router()


router.route('/')
    .post(authController.isLoggedIn  ,commentController.createComment)
    .get(commentController.getComment)

// router.route('/like')
//     .post(authController.isLoggedIn, commentController.likePost)

module.exports = router