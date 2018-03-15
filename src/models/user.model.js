const crypto = require('crypto');

const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});



schema.methods.getPublicFields = function() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    password: this.password
  };
};

exports.User = mongoose.model("User", schema);
