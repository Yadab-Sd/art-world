require("dotenv").config();
const express = require("express");
const data = require("./utils/data.json");
const path = require("path");

const app = express();

app.set(process.env.SERVER_PORT_KEYNAME, process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  console.log(req.url, req.method);
  next();
});

app.use(express.static(path.join(__dirname, process.env.STATIC_FOLDER_NAME)));

const server = app.listen(
  app.get(process.env.SERVER_PORT_KEYNAME),
  function () {
    console.log(data.serverMessage.startListening, server.address().port);
  }
);
