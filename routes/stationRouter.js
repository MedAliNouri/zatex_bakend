const router = require('express').Router()
const stationService = require('../services/stationService')
const StationService = require('../services/stationService')
class StationRouter{

}
router.get('/',async (req,res)=>{
    try{
        const doc = await stationService.getAll()
  res.json({status:true,data:doc})
      }
      catch(err){
  console.log(err.message)
  res.json({status:false,message:err.message})
      }
})
router.get('/:id',async (req,res)=>{
    try{
        const doc = await stationService.getById(req.params.id)
  res.json({status:true,data:doc})
      }
      catch(err){
  console.log(err.message)
  res.json({status:false,message:err.message})
      }
})
router.delete('/:id',async (req,res)=>{
    try{
        const doc = await stationService.delete(req.params.id)
  res.json({status:true,data:doc})
      }
      catch(err){
  console.log(err.message)
  res.json({status:false,message:err.message})
      }
})
router.post('/',async (req, res)=>{
    try{
      const doc = await stationService.create(req.body)
res.json({status:true,data:doc})
    }
    catch(err){
console.log(err.message)
res.json({status:false,message:err.message})
    }
})
router.post('/update',async (req, res)=>{
    try{
      const doc = await stationService.updateOne(req.body)
res.json({status:true,data:doc})
    }
    catch(err){
console.log(err.message)
res.json({status:false,message:err.message})
    }
})
module.exports = router;