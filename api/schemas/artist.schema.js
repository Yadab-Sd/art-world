const { Schema } = require("mongoose");
const artSchema = require("./art.schema");

const artistSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  image: String,
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
  arts: [artSchema],
});

module.exports = artistSchema;
