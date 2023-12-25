const user = require ('../models/userModel')

exports.signUp = async (req,res,next) => {
    try {
       const newUser = await user.create(req.body)
       req.status(201).json({
        status: 'success',
        data : {
            newUser
        }
       })
    } catch (error) {
        res.status(400).json({
            status: 'Failed'
        })
    }
}