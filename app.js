const express = require("express");
const path = require("path");
require("dotenv").config();
require("./api/db/connection");
const data = require("./api/utils/data.json");
const routes = require("./api/routes");
const app = express();

app.set(process.env.SERVER_PORT_KEYNAME, process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  console.log(req.url, req.method);
  next();
});
app.use(data.paths.base, routes);
app.use(express.static(path.join(__dirname, process.env.STATIC_FOLDER_NAME)));

const server = app.listen(
  app.get(process.env.SERVER_PORT_KEYNAME),
  function () {
    console.log(data.serverMessage.startListening, server.address().port);
  }
);
