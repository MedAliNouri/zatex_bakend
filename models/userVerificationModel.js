const mongoose= require('mongoose')

const userVerificationSchema = mongoose.Schema({
    user: {
       
        type: String,
     
    },
    hashedToken:{
       
        type: String,
     
    },
    createdAt: { type: Date, expires: 3600, default: Date.now }
})

module.exports = mongoose.model('userVerification',userVerificationSchema)