const express = require("express");
const artistRouter = express.Router();
const artsRouter = require("./art.route");
const artistController = require("../controllers/artist.controller");
const data = require("../utils/data.json");
const { authenticateToken } = require("../utils/methods");

artistRouter
  .route(data.paths.artist.all)
  .get(artistController.getAll)
  .post(artistController.createOne);

artistRouter
  .route(data.paths.artist.one)
  .get(artistController.getOne)
  .patch(artistController.partialUpdateOne)
  .put(artistController.fullUpdateOne)
  .delete(authenticateToken, artistController.deleteOne);

artistRouter.use(data.paths.artist.one, artsRouter);

module.exports = artistRouter;
