const express = require("express");
const artistRouter = express.Router();
const artsRouter = require("./art.route");
const artistController = require("../controllers/artist.controller");
const data = require("../utils/data.json");

artistRouter
  .route(data.paths.artist.all)
  .get(artistController.getAll)
  .post(artistController.createOne);

artistRouter
  .route(data.paths.artist.one)
  .get(artistController.getOne)
  .put(artistController.updateOne)
  .delete(artistController.deleteOne);

artistRouter.use(data.paths.artist.one, artsRouter);

module.exports = artistRouter;
