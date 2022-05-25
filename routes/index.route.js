class routers{
    constructor(app,authorize) {
        const userRouter=require('./user.route')
        app.use('/user',authorize,userRouter)
        const stationRouter=require('./stationRouter')
        app.use('/station',authorize,stationRouter)
        const tankRouter=require('./tankRouter')
        app.use('/tank',authorize,tankRouter)
        const authRouter=require('./authRouter')
        app.use('/auth',authRouter)
    }
}




module.exports = routers