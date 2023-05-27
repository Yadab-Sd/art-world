const { Schema } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
