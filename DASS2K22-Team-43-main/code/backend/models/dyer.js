const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dyerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String, required: true },
    address: { type: String, required: true },
    manager_name: { type: String},
    date_of_joining: { type: String}
});

const dyer = mongoose.model('dyer', dyerSchema);
module.exports = dyer;