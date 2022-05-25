const mongoose = require('mongoose');


 userSchema =  mongoose.Schema({
    name:{
       
        type: String,
     
    },
    lastName:{
       
        type: String,
     
    },
    email:{
       
        type: String,
     
    },
    phone:{
       
        type: String,
     
    },
    civility:{
       
        type: String,
     
    },
    post:{
       
        type: String,
     
    },
    socialReason:{
       
        type: String,
     
    },
    password:{
       
        type: String,
     
    },
    urlPhoto:{
       
        type: String,
     
    },
    gerant:{
       
        type: String,
     
    },
    role:{
        type:String,
        enum : ['ADMIN','EMPLOYEE','GERANT'],
        default: 'EMPLOYEE'
    },
    isVerified: { type: Boolean, default: false },
})
module.exports = mongoose.model('user',userSchema)