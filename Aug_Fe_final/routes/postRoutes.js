const express = require('express')
const postController = require('./../controllers/postController')
const authController = require('./../controllers/authController')


const router = express.Router()

router.route('/')
    .post(authController.isLoggedIn, postController.postData)
    .get(postController.getData)
    .delete(authController.isLoggedIn, postController.deletePost)

router.route('/:id')
    .patch(authController.isLoggedIn, postController.likePost )
    .get(postController.getSinglepost)

module.exports = router