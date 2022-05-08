const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const mailService = require('./mailService')
const verificationModel = require('../models/userVerificationModel')
const resetPassModel=require('../models/RestPasswordModel')
class UserService {


async createUser(data,req){
     
    const emailExist= await userModel.findOne({'email':data.email})
  
  if(emailExist){
     throw new Error('user exist')
    }
   
  
     
     const solt = await bcrypt.genSalt(10)
     const hashpassword =await bcrypt.hash(data.password,solt)
     data.password=hashpassword
     const user = await userModel.create(data)
     console.log(Math.floor((Math.random() * 4000) + 404))
     var rand = Math.floor((Math.random() * 4000) + 404)
    await mailService.sendMailVerification(user.email,process.env.MAIL_VERIFICATION_SUBJECT,user.name_lastName,rand)
    let verification_to_save={
      verif_code:rand,
      user:user
    }
 
  
    verificationModel.findOneAndDelete({"user.email":user.email})
   console.log( await verificationModel.create(verification_to_save))
    
    return user
 
     

  
 }


 async change_password(user,password){
  const query={_id:user}
  const solt = await bcrypt.genSalt(10)
  const hashpassword =await bcrypt.hash(password,solt)
  
    const result= await userModel.updateOne(query,{'password':hashpassword})
    if(!result){
  
  throw new Error('password not updated')
    }
  
    console.log( await resetPassModel.findOneAndDelete({user:user}))
    return 'password updated'
  }
}


module.exports = new UserService()