const express = require('express')
const router = express.Router()
const authService = require('../services/authService')

class AuthRouter {
}

router.post('/login',async(req,res)=>{

    try{
        const docs = await authService.login(req.body)
        res.header('TOKEN',docs.token).json(docs)
    }catch(err){
     
        res.json({ message: err.message })
    }
})
router.post('/restPassword',async(req,res)=>{


    try{
        const docs = await authService.resetPassword(req.body.email)
        res.json({status:true, message: docs })
    }catch(err){
     console.log(err)
        res.json({status:false, message: err.message })
    }
})
router.post('/send_verification_mail',async(req,res)=>{


    try{
        const docs = await authService.send_verification_mail(req.body.email)
        res.json({status:true, message: docs })
    }catch(err){
     console.log(err)
        res.json({status:false, message: err.message })
    }
})
router.post('/verify_mail',async(req,res)=>{


    try{
        const docs = await authService.verify_mail(req.body.token)
        res.json({status:true, data: docs })
    }catch(err){
     console.log(err)
        res.json({status:false, message: err.message })
    }
})
router.get('/get_token_password/:id',async(req,res)=>{
    try{
        const doc = await authService.get_token_password(req.params.id)
        res.json({status:true, message: doc })
    }catch(err){
     console.log(err)
        res.json({status:false, message: err.message })
    }
})

module.exports= router;