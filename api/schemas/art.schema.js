const mongoose = require("mongoose");

const artSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: String,
});

module.exports = artSchema;
