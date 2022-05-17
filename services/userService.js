const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const mailService = require('./mailService')
const authService = require('./authService')
const path = require('path')
const resetPassModel=require('../models/RestPasswordModel')
const cloudinary = require('../config/cloudinary')
const DatauriParser=require("datauri/parser");
const { findByIdAndUpdate } = require('../models/users')
const parser = new DatauriParser();
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
    await authService.send_verification_mail(user.email)
    
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
  async getAll(){
        
    const user =await userModel.find().select("-password")

    return user

   }
  async getOne(id){
     return await userModel.findById({'_id':id})
   }
   async uploadAvatar(id,req){
console.log("++++++++++++++++",id)
    
    const extName = path.extname(req.file.originalname).toString();
    const file64 = parser.format(extName, req.file.buffer);
    const result = await cloudinary.uploader.upload(file64.content, { folder: "uploads/user_avatar/"} )
    console.log("result of Cloudinary upload",result)
    
    await userModel.findByIdAndUpdate(id, {urlPhoto:result.secure_url})
 return {urlPhoto:result.secure_url}
  }
async  create_user_with_avatar(user,req){
    user=  JSON.parse(user)
    console.log(user)
    const findUser =await userModel.findOne({"email":user.email})
    if(findUser){
      throw new Error('email exist')
    }
    if(req.file){
      const extName = path.extname(req.file.originalname).toString();
    const file64 = parser.format(extName, req.file.buffer);
    const result = await cloudinary.uploader.upload(file64.content, { folder: "uploads/user_avatar/"} )
    console.log("result of Cloudinary upload",result)
    user.urlPhoto=result.secure_url
    }
    const solt = await bcrypt.genSalt(10)
    const hashpassword =await bcrypt.hash(user.password,solt)
    user.password=hashpassword
    await  userModel.create(user)
    if(!user.isVerified){
      await authService.send_verification_mail(user.email)
      }
  
    
  return true
  }

  async updateOne(user){
    console.log("InfoUser",user)
    if(user.password){
      const solt = await bcrypt.genSalt(10)
      const hashpassword =await bcrypt.hash(user.password,solt)
      user.password=hashpassword
    }
  
await userModel.findByIdAndUpdate({"_id":user._id},{ $set:user})
return await userModel.findById({"_id":user._id})
  }
  findByIdAndDelete(id) {
console.log(id)
    return userModel.findByIdAndDelete(id).exec()


}
}



module.exports = new UserService()