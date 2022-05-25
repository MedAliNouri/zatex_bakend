const mongoose =require('mongoose')

const historiquepistoletSchema = mongoose.Schema({
    indexDebut:{
       
        type: Date,
       
    },
    indexFin:{
       
        type: Date,
       
    },
    typePost:{
        type:String
    },
    date:Date.now()
   
})

module.exports = mongoose.model('historiquepistolet',historiquepistoletSchema)