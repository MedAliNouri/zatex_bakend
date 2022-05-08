const mongoose= require('mongoose')

const resetPasswordSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    token:{
       
        type: String,
     
    },
    createdAt: { type: Date, expires: 3600, default: Date.now }
})

module.exports = mongoose.model('resetPassword',resetPasswordSchema)