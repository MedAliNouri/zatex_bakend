const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailService = require('./mailService')
const resetPassModel=require('../models/RestPasswordModel')
const verificationModel = require('../models/userVerificationModel')
require('dotenv').config()
class AuthService {

    async login(data){
        try{
         
        }catch(err){
            console.log(err)
        }
        console.log(data.email)
        const user= await userModel.findOne({'email':data.email})
      
        console.log(user)
        if(!user){ return {status:false,code:1,data: process.env.USER_NOT_FOUND}}
        else{
            if(!user.isVerified){
          console.log( process.env.ACCOUNT_NOT_VERIFIED)
                return {status:false,code:2,data: process.env.ACCOUNT_NOT_VERIFIED}
            }
          const  passCompaire=await bcrypt.compare(data.password,user.password)
          if(!passCompaire){
          
              return {status:false,code:3,data: process.env.ERROR_PASSWORD}
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
async send_verification_mail(email){
    console.log(email)
    const user= await userModel.findOne({'email':email})
    if(!user){
        throw new Error('mail invalid')
       
    }
    if(user.isVerified){
        throw new Error('votre compte est vérifié')
       
    }
    const hashedToken=await require('crypto').randomBytes(10).toString('hex');
    await mailService.sendMailVerification(user.email,process.env.MAIL_VERIFICATION_SUBJECT,user.name_lastName,hashedToken)
    let verification_to_save={
      hashedToken:hashedToken,
      user:user._id
    }
  
    console.log( await  verificationModel.findOneAndDelete({"user":user._id}))
  
   console.log( await verificationModel.create(verification_to_save))
   return true
  }
async get_token_password(id){

const result= await resetPassModel.findOne({token:id}).populate('user').exec()
console.log(result)
if(!result){
    throw new Error('Token expired')
}
return result
}
async verify_mail(token){
    const result=   await verificationModel.findOne({'hashedToken':token})
    console.log(result)
if(!result){
    throw new Error('Token expired')
}
const user_to_log= await userModel.findByIdAndUpdate(result.user,{isVerified:true})

await  verificationModel.findOneAndDelete({"_id":result._id})
return user_to_log
}

}
module.exports =new AuthService()