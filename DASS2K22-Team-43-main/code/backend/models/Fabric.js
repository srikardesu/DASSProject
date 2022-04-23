const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fabricSchema = new Schema({
    yarnPackageNumber: {type: String},      // will reference to the yarn package
    weaverID: { type: String},
    completionDate: {type: String},
    length : {type: Number},
    Colours: [{
        ColourID: {type: String},
        Quantity: {type: Number}
    }],
    Sold: {type: Boolean}
})

const fabric = mongoose.model('fabric', fabricSchema);
module.exports = fabric;