const crypto = require('crypto');

const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    value: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});



schema.methods.getPublicFields = function () {
    return {
        value: this.value,
        currency: this.currency
    };
};

exports.Bill = mongoose.model("Bill", schema);
