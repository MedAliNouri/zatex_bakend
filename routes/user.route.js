const userService = require('../services/userService')
const express = require('express')
const multerUploads = require('../middleware/upload_images')
const router = express.Router()




class userRouter {


    }
    router.get('/',async (req,res,next)=>{
       
        try{
         const docs=   await userService.getAll()
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.get('/employee',async (req,res,next)=>{
       
        try{
         const docs=   await userService.getAllEmplyee()
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.get('/getEmployeeForGerant/:id',async (req,res,next)=>{
       
        try{
         const docs=   await userService.getEmployeeForGerant(req.params.id)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.get('/:id',async (req,res,next)=>{
       
        try{
         const docs=   await userService.getOne(req.params.id)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      
    router.post('/register',async (req,res,next)=>{
       
        try{
         const docs=   await userService.createUser(req.body)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.post('/uploadAvatar',multerUploads,async (req,res,next)=>{
       
        try{
         const docs=   await userService.uploadAvatar(req.body.id,req)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.post('/create_user_with_avatar',multerUploads,async (req,res,next)=>{
       
        try{
         const docs=   await userService.create_user_with_avatar(req.body.user,req)
            res.send(docs)
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.post('/updateOne',multerUploads,async (req,res,next)=>{
       
        try{
         const docs=   await userService.updateOne(req.body)
         res.status(201).json({status:true, message: docs })
        }catch(err){
            console.log(err)
            res.status(201).json({status:false, message: err.message })
        }

      })
      router.delete('/findByIdAndDelete/:id',async (req,res,next)=>{
       
        try{
         const docs=   await userService.findByIdAndDelete(req.params.id)
         res.status(201).json({status:true, message: docs })
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