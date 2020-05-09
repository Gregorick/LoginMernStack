const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const newSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
        },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now        
    }
})

module.exports = model('users', newSchema);