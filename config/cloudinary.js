
require('dotenv').config()
const cloudinary = require('cloudinary').v2
 cloudinary.config({
  cloud_name:'swipeup',
  api_key:'462543552987297',
api_secret:"bezOgrfri43LhaH_azJyCzF0lpI"
})
module.exports=cloudinary