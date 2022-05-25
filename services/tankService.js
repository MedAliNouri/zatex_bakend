const tankModel = require('../models/tankModel')


class TankService{

async create(data){

    return await tankModel.create(data)
}

async getAll(){
    return await tankModel.find()
}
}

module.exports = new TankService()