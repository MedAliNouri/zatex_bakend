const mongoose = require('mongoose')

require('dotenv').config()
console.log(process.env.MONGODB_ACCESS)
mongoose.connect(process.env.MONGODB_ACCESS, {
    useNewUrlParser: true,
   // useCreateIndex: true,
      // useFindAndModify: false,
       useUnifiedTopology: true 
})
const startdb = mongoose.connection
startdb.on('error', (error) => console.error(error))
startdb.once('open', () => console.log('connected to database'))