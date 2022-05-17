const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports =(req,res,next)=>{
  
  try{
    console.log(req.headers.authorization)
    const token = req?.headers?.authorization?.split(" ")[1];
    jwt.verify(token,process.env.SECRET_TOKEN)
     
         next();

    
  }catch(err){
      // console.log(err)
      res.status(401).send(err.message)
 }
}
