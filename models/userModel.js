const mongoose = require ('mongoose')

const users =  mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please Provide a username']
    },

    password:{
        type: String,
        required: [true, 'A Password is required']
    }
})

module.exports = momgoose.model('Accounts',users)