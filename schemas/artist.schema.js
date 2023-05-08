const { Schema } = require("mongoose");
const artSchema = require("./art.schema");
const data = require("../utils/data.json");

const artistSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, data.validationMessage.name],
  },
  dateOfBirth: String,
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  },
  cost: Number,
  address: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  arts: [artSchema],
});

module.exports = artistSchema;
