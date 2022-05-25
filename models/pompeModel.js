const mongoose =require('mongoose')

const pompeSchema = mongoose.Schema({
    name:{
       
        type: String,
       
    },
    pistolets:[{ type: mongoose.Schema.Types.ObjectId, ref: 'pistolet' }]
   
})

module.exports = mongoose.model('pompe',pompeSchema)