const { Schema } = require("mongoose");
const artSchema = require("./art.schema");
const data = require("../utils/data.json");

const artistSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  dateOfBirth: String,
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5,
  },
  cost: Number,
  location: {
    address: String,
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  email: {
    type: String,
    unique: true,
  },
  arts: [artSchema],
});

module.exports = artistSchema;
