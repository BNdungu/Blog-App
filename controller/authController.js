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
            
        req.session.user = newUser
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

exports.login = async (req,res) => {
    const {username, password} = req.body

    try {
        const loginUser = await user.findOne({username})

        if (!loginUser){
            return res.status(400).json({
                status: 'failed',
                msg: 'user not found'
            })
        }

        const isCorrect = await bcrypt.compare(password,loginUser.password)

        if (isCorrect){
            req.session.user = loginUser
            console.log(req.session)
            res.status(201).json({
                status: 'success',
                data:{
                    user: loginUser
                }
            })
        }

        else{
            res.status(400).json({
                status: 'failed',
                msg: 'AUthentication error'
            })
        }
     } catch (error) {
         console.error(error)
         res.status(400).json({
             status: 'Failed'
         })
     }
}