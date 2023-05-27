const express = require("express");
const artsRouter = express.Router({ mergeParams: true });
const artController = require("../controllers/art.controller");
const data = require("../utils/data.json");
const { authenticateToken } = require("../utils/methods");

artsRouter
  .route(data.paths.art.all)
  .get(artController.getAll)
  .post(authenticateToken, artController.createOne);

artsRouter
  .route(data.paths.art.one)
  .get(artController.getOne)
  .put(authenticateToken, artController.updateOne)
  .delete(authenticateToken, artController.deleteOne);

module.exports = artsRouter;
