const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yarnPackageSchema = new Schema({
    // yarnPackageNumber: {type: Number}, MongoDB automatically gives an ID.
    spinnerID: { type: String},
    countNumber: {type: Number},
    twistNumber: {type: Number},
    spinDate: {type: String},
    cottonOrigin: {type: String},
    yarnType: {type: String},
    dyerID: {type: String},
    dyeingDate: {type: String},    
    colours: [{
            ColourID: {type: String},
            Quantity: {type: Number}
        }],
    specialTreatment: {type: String},
    currentStatus: {type: String}       // With Spinner or dyer or weaver?
})

const yarnPackage = mongoose.model('yarnPackage', yarnPackageSchema);
module.exports = yarnPackage;