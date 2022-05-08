
const mongoose = require('mongoose');

 mailSchema = mongoose.Schema({
    to:{
       
        type: String,
     
    },
from:{
       
    type: String,
 
},
subject:{
       
    type: String,
 
},
html:{
       
    type: String,
 
},
Create_in:{
    type: Date,
    default: Date.now
 
}
})
module.exports = mongoose.model('mail',mailSchema)