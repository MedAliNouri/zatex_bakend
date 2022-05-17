const express = require('express')
const app=express()
const authorize = require('./middleware/verifyToken')
const bodyParser = require('body-parser');
var cors = require('cors')
require('./config/db')
routers= require('./routes/index.route')
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

//  require('./src/services/mailService').sendMail()
// userModel.create({name:'dali',lastName:'dali',email:'gameeforall@gmail.com',password:'dali',})
app.use(express.json({limit: '50mb'}));
new routers(app,authorize)
app.listen(4000,()=>{console.log('server work')})