const mongoose= require('mongoose')

const userVerificationSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    verif_code:{
       
        type: String,
     
    },
    createdAt: { type: Date, expires: 3600, default: Date.now }
})

module.exports = mongoose.model('userVerification',userVerificationSchema)