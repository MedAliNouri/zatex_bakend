const mongoose =require('mongoose')

const tankSchema = mongoose.Schema({
    type:{
       
        type: String,
        enum : ['ESSENCE','DISEL'],
       
    },
    capacity:{
       
        type: Number,
     
    },
    min:{
       
        type: Number,
     
    },
    max:{
       
        type: Number,
     
    },
   
})

module.exports = mongoose.model('tank',tankSchema)