const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weaverSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: String, required: true },
    address: { type: String, required: true },
});

const weaver = mongoose.model('weaver', weaverSchema);
module.exports = weaver;