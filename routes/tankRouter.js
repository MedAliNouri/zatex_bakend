const router = require('express').Router()
const tankService = require('../services/tankService')

class TankRouter{

}
router.get('/',async (req,res)=>{
    try{
        const doc = await tankService.getAll()
  res.json({status:true,data:doc})
      }
      catch(err){
  console.log(err.message)
  res.json({status:false,message:err.message})
      }
})
router.post('/',async (req, res)=>{
    try{
      const doc = await tankService.create(req.body)
res.json({status:true,data:doc})
    }
    catch(err){
console.log(err.message)
res.json({status:false,message:err.message})
    }
})
module.exports = router;