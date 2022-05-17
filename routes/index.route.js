class routers{
    constructor(app,authorize) {
        const userRouter=require('./user.route')
        app.use('/user',userRouter)
        const authRouter=require('./authRouter')
        app.use('/auth',authRouter)
    }
}




module.exports = routers