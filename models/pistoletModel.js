const mongoose =require('mongoose')

const pistoletSchema = mongoose.Schema({
    type:{
       
        type: String,
       
    },
    name:{
       
        type: String,
       
    },
    historique:[{ type: mongoose.Schema.Types.ObjectId, ref: 'historiquePistolet' }]
   
})

module.exports = mongoose.model('pistolet',pistoletSchema)