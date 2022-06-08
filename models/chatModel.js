const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({

   members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    conversation: [{
        from:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        texte: {
            type: String
        },
        createdDate: {
            type: Date,
            default:Date.now()
        },
    }],
    

})

module.exports = mongoose.model('chat', chatSchema)