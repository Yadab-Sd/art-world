const mongoose = require("mongoose");
const { artistSchema, userSchema } = require("../schemas");
const data = require("../utils/data.json");

module.exports.Artist = mongoose.model(
  data.db.model.artist,
  artistSchema,
  process.env.DB_ARTIST_COLLECTION_NAME
);

module.exports.User = mongoose.model(
  data.db.model.user,
  userSchema,
  process.env.DB_USER_COLLECTION_NAME
);
