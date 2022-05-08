const userService = require('../services/userService')
const express = require('express')
const router = express.Router()




class userRouter {


    }

    router.post('/register',async (req,res,next)=>{
       
        try{
         const docs=   await userService.createUser(req.body)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.post('/change_password',async(req,res)=>{
    

        try{
            const docs = await userService.change_password(req.body.user,req.body.password)
            res.json({status:true, message: docs })
        }catch(err){
         console.log(err)
            res.json({status:false, message: err.message })
        }
    })
      
module.exports = router;