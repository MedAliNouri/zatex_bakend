const express = require('express')
const app=express()
const authorize = require('./middleware/verifyToken')
const bodyParser = require('body-parser');
var cors = require('cors')
require('./config/db')
var socket = require('socket.io');
routers = require('./routes/index.route')
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

var server = app.listen(4000,()=>{console.log('server work')})
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
require('./services/socketService')(io)


app.use(express.json({limit: '50mb'}));
new routers(app,authorize)
