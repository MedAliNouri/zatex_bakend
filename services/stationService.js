const stationModel = require('../models/stationModel')
const tankModel = require('../models/tankModel')
const pompeModel= require('../models/pompeModel')
const pistoletModel = require('../models/pistoletModel')
class StationService{

async create(data){

    return await stationModel.create(data)
}

async getAll(){
    return await stationModel.find()
}
async getById(id){
    return await stationModel.findById({"_id":id}).populate({path:'employees'})
}
async delete(id){
    return await stationModel.deleteOne({'_id':id})
}
async updateOne(data){

let station = new stationModel(data)
console.log(station)
    return await stationModel.findByIdAndUpdate({"_id":data._id},{ $set:station})
}
}

module.exports = new StationService()