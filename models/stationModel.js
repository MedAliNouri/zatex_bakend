const mongoose =require('mongoose')

const stationSchema = mongoose.Schema({
    name:{
       
        type: String,
     
    },
    city:{
       
        type: String,
     
    },
    street:{
       
        type: String,
     
    },
    zipCode:{
       
        type: String,
     
    },
    departement:{
       
        type: String,
     
    },
    post:{
       
        type: String,
     
    },
  position:{lat:{
       
    type: String,
 
}, lng:{
       
    type: String,
 
}},
    tanks:[{type:{
       
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
     
    }}],
    employees:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    pompes:[{
        name:{
           
            type: String,
           
        },
        pistolets:[{
            type:{
               
                type: String,
               
            },
            name:{
               
                type: String,
               
            },
            historique:[{
                indexDebut:{
                   
                    type: Date,
                   
                },
                indexFin:{
                   
                    type: Date,
                   
                },
                typePost:{
                    type:String
                },
                date:{
                    type: Date,
                    default: Date.now(),
                   
                },
            }]
           
        }]
       
    }]
})

module.exports = mongoose.model('station',stationSchema)