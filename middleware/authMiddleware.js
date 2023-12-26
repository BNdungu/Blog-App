const protect = (req,res,next) => {
    const {user} = req.session
    console.log(req.session)

    if (!user){
        return res
            .status(401)
            .json({
                status: 'failed',
                msg: 'unauthorised'
            })  
    }
    req.user =user

    next()
}

module.exports = protect