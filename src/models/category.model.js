const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    capacity: {
        type: Number,
        required: true
    },
    name: {
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
        id: this._id.toString(),
        capacity: this.capacity,
        name: this.name
    };
};

exports.Category = mongoose.model("Category", schema);
