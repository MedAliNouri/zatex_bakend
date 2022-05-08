const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailService = require('./mailService')
const resetPassModel=require('../models/RestPasswordModel')
require('dotenv').config()
class AuthService {

    async login(data){
        try{
         
        }catch(err){
            console.log(err)
        }
       
        const user= await userModel.findOne({'email':data.email})
      
        if(!user){ return {status:false,data: process.env.USER_NOT_FOUND}}
        else{
         
          const  passCompaire=await bcrypt.compare(data.password,user.password)
          if(!passCompaire){
          
              return {status:false,data: process.env.ERROR_PASSWORD}
          }
          else{
              const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN)
           
              return {status:passCompaire,data:{
                  user:user,
                  token:token
              }}
        }
        }
        
    }
async resetPassword(email){
    
    const user= await userModel.findOne({'email':email})

    if(!user){
        throw new Error('mail invalid')
       
    }
    const hashedToken=await require('crypto').randomBytes(10).toString('hex');
    const result= await resetPassModel.create({user:user,token:hashedToken})
try{
    return await mailService.sendMailResetPassword(email,process.env.resetPassMailSubject,hashedToken)
}catch(err){
    console.log(err)
}


}


async get_token_password(id){

const result= await resetPassModel.findOne({token:id}).populate('user').exec()
console.log(result)
if(!result){
    throw new Error('Token expired')
}
return result
}

}
module.exports =new AuthService()