const { Artist } = require("../models");
const data = require("../utils/data.json");
const {
  checkErrorAndDoCallback,
  checkContentAndSetResponse,
  updateOneArtist,
  checkBodyAndDoCallback,
  createResponse,
  sendResponse,
  handleError,
  addArt,
  updateArt,
  removeArt,
  getAllArtsFromArtist,
  getOneArtFromArtist,
} = require("../utils/methods");

module.exports.getAll = function (req, res) {
  const response = createResponse();
  const artistId = req.params.artistId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec()
    .then((artist) => getAllArtsFromArtist(artist, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};

module.exports.getOne = function (req, res) {
  const response = createResponse();
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec()
    .then((artist) => getOneArtFromArtist(artist, artId, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};

module.exports.createOne = function (req, res) {
  const afterBodyFound = function () {
    const response = createResponse();
    const artistId = req.params.artistId;
    const art = req.body;
    Artist.findById(artistId)
      .exec()
      .then((artist) => checkContentAndSetResponse(artist, response))
      .then((artist) => addArt(artist, art, response))
      .then((artist) => updateOneArtist(artist))
      .then((artist) => checkContentAndSetResponse(artist, response))
      .catch((error) => handleError(error, response))
      .finally(() => sendResponse(res, response));
  };

  checkBodyAndDoCallback(req, afterBodyFound);
};

module.exports.updateOne = function (req, res) {
  const afterBodyFound = function () {
    const response = createResponse();
    const artistId = req.params.artistId;
    const artId = req.params.artId;
    const art = req.body;
    Artist.findById(artistId)
      .exec()
      .then((artist) => checkContentAndSetResponse(artist, response))
      .then((artist) => updateArt(artist, artId, art, response))
      .then((artist) => updateOneArtist(artist))
      .then((artist) => getOneArtFromArtist(artist, artId, response))
      .catch((error) => handleError(error, response))
      .finally(() => sendResponse(res, response));
  };
  checkBodyAndDoCallback(req, afterBodyFound);
};

module.exports.deleteOne = async function (req, res) {
  const response = createResponse();
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId)
    .exec()
    .then((artist) => checkContentAndSetResponse(artist, response))
    .then((artist) => removeArt(artist, artId, response))
    .then((artist) => updateOneArtist(artist))
    .then((artist) => getOneArtFromArtist(artist, artId, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};
