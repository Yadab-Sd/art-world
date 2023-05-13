const express = require("express");
const artsRouter = express.Router({ mergeParams: true });
const artController = require("../controllers/art.controller");
const data = require("../utils/data.json");

artsRouter
  .route(data.paths.art.all)
  .get(artController.getAll)
  .post(artController.createOne);

artsRouter
  .route(data.paths.art.one)
  .get(artController.getOne)
  .put(artController.updateOne)
  .delete(artController.deleteOne);

module.exports = artsRouter;
