const user = require ('../models/userModel')

exports.signUp = async (req,res) => {
    try {
       const newUser = await user.create(req.body)
       res.status(201).json({
        status: 'success',
        data : {
            newUser
        }
       })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            status: 'Failed'
        })
    }
}