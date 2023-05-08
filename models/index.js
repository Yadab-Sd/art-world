const mongoose = require("mongoose");
const artistSchema = require("../schemas/artist.schema");
const data = require("../utils/data.json");

module.exports.Artist = mongoose.model(
  data.db.model.artist,
  artistSchema,
  process.env.DB_ARTIST_COLLECTION_NAME
);
