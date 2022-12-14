const mongoose = require('mongoose');

const OwnerSchema = require('./owner.schema').OwnerSchema;

const OwnerModel = mongoose.model("owner", OwnerSchema);

function createOwner(owner) {
    return OwnerModel.create(owner);
}

function getOwnerByName(name) {
    return OwnerModel.find({
        name,
    }).exec();
}


module.exports = {
    createOwner,
    getOwnerByName,
}