const express = requier ('express')
const postController = require('../controller/postController')

const router = express.Router()

router.route('/').get(postController.getAllPosts).post()