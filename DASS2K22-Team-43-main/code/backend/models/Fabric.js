const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fabricSchema = new Schema({
    yarnPackageNumber: {type: Number},      // will reference to the yarn package
    weaverID: { type: String},
    barcode: {type: String},
    completionDate: {type: String},
    length : {type: Number},
    Colours: [{
        ColourID: {type: String},
        Quantity: {type: Number}
    }],
    CurrentStatus: {type: String}       // With Spinner or dyer or weaver?
})

const fabric = mongoose.model('fabric', fabricSchema);
module.exports = fabric;