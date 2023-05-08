const mongoose = require("mongoose");

const artSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: String,
  type: String,
  price: Number
});

module.exports = artSchema;
