const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    'title':{
        type: String,
        required: [true, "Post must have a title"]
    },

    'body':{
        type: String,
        require: [true, 'Post must have body']
    }
})

module.exports = mongoose.model('Post', postSchema)