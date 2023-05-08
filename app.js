const express = require("express");
const app = express();
const data = require("./utils/data.json");

require("dotenv").config();


const server = app.listen(process.env.PORT, function () {
  console.log(data.serverMessage.startListening, server.address().port);
});
