const user = require ('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async (req,res) => {
    const {username, password} = req.body
    const hashPassword = await bcrypt.hash(password,12)

    try {
       const newUser = await user.create({
            username,
            password: hashPassword
            })

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