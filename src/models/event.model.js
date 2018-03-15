const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    catName: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});



schema.methods.getPublicFields = function () {
    return {
        id: this._id.toString(),
        amount: this.amount,
        type: this.type,
        date: this.date,
        description: this.description,
        category: this.category,
        catName: this.catName
    };
};

exports.Event = mongoose.model("Event", schema);
