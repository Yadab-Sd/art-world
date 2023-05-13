const mongoose = require("mongoose");
const data = require("../utils/data.json");
require("../models");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(data.db.connection.connected, function () {
  console.log(data.db.connection.connectedMessage);
});

mongoose.connection.on(data.db.connection.disconnected, function () {
  console.log(data.db.connection.dicconnectedMessage);
});

mongoose.connection.on(data.db.connection.error, function (error) {
  console.log(data.db.connection.errorMessage, error);
});
