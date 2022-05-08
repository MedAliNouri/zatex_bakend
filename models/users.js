const mongoose = require('mongoose');


 userSchema =  mongoose.Schema({
    name_lastName:{
       
        type: String,
     
    },
    email:{
       
        type: String,
     
    },
    password:{
       
        type: String,
     
    },
    urlPhoto:{
       
        type: String,
     
    },
    isVerified: { type: Boolean, default: false },
})
module.exports = mongoose.model('user',userSchema)