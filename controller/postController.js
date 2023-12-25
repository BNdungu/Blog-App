const Post = require('../models/postModel')


exports.getAllPosts = async (req,res,next) => {
    try {
        const posts = await Post.find()
    } catch (error) {
        
    }
}