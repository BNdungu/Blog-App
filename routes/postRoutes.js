const express = require ('express')
let protect = require('../middleware/authMiddleware')
const postController = require('../controller/postController')

const router = express.Router()

router.route('/')
    .get(postController.getAllPosts)
    .post(protect, postController.createPost)
router.route('/:id')
    .get(protect,postController.getOnePost)
    .patch(protect,postController.updatePost)
    .delete(protect,postController.deletePost)

module.exports = router 