const { Artist } = require("../models");
const data = require("../utils/data.json");
const {
  createResponse,
  updateOneArtist,
  handleError,
  checkContentAndSetResponse,
  sendResponse,
  parseOffsetAndCount,
  formatDataForFullUpdate,
  formatDataForPartialUpdate,
  checkBodyAndDoCallback,
} = require("../utils/methods");

const _getAllByGeo = function (req, res, offset, count) {
  const response = createResponse();
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const point = {
    type: data.db.geo.typePoint,
    coordinates: [lng, lat],
  };
  const query = {
    [data.db.geo.key]: {
      $near: {
        $geometry: point,
        $maxDistance: data.db.geo.maxDistance,
        $minDistance: data.db.geo.minDistance,
      },
    },
  };
  Artist.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then((artistList) => checkContentAndSetResponse(artistList, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};

module.exports.getAll = function (req, res) {
  const { offset, count } = parseOffsetAndCount(req);
  if (req.query && req.query.lat && req.query.lng) {
    _getAllByGeo(req, res, offset, count);
  } else {
    const response = createResponse();
    Artist.find()
      .skip(offset)
      .limit(count)
      .sort({ _id: data.order.desc })
      .then((artistList) => checkContentAndSetResponse(artistList, response))
      .catch((error) => handleError(error, response))
      .finally(() => sendResponse(res, response));
  }
};

module.exports.getOne = function (req, res) {
  const response = createResponse();
  const artistId = req.params.artistId;
  Artist.findById(artistId)
    .exec()
    .then((artist) => checkContentAndSetResponse(artist, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};

module.exports.createOne = function (req, res) {
  const response = createResponse();
  const artist = req.body;
  Artist.create(artist)
    .then((artist) => checkContentAndSetResponse(artist, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};

module.exports.partialUpdateOne = function (req, res) {
  const afterBodyFound = function () {
    const response = createResponse();
    const artistId = req.params.artistId;
    const formatedDataForUpdate = formatDataForPartialUpdate(req);
    Artist.findById(artistId)
      .exec()
      .then((artist) => checkContentAndSetResponse(artist, response))
      .then((artist) => updateOneArtist(artist, formatedDataForUpdate))
      .then((updatedArtist) =>
        checkContentAndSetResponse(updatedArtist, response)
      )
      .catch((error) => handleError(error, response))
      .finally(() => sendResponse(res, response));
  };
  checkBodyAndDoCallback(req, afterBodyFound);
};

module.exports.fullUpdateOne = function (req, res) {
  const afterBodyFound = function () {
    const response = createResponse();
    const artistId = req.params.artistId;
    const formatedDataForUpdate = formatDataForFullUpdate(req);
    Artist.findById(artistId)
      .exec()
      .then((artist) => checkContentAndSetResponse(artist, response))
      .then((artist) => updateOneArtist(artist, formatedDataForUpdate))
      .then((updatedArtist) =>
        checkContentAndSetResponse(updatedArtist, response)
      )
      .catch((error) => handleError(error, response))
      .finally(() => sendResponse(res, response));
  };
  checkBodyAndDoCallback(req, afterBodyFound);
};

module.exports.deleteOne = function (req, res) {
  const response = createResponse();
  const artistId = req.params.artistId;
  Artist.findByIdAndDelete(artistId)
    .exec()
    .then((artist) => checkContentAndSetResponse(artist, response))
    .catch((error) => handleError(error, response))
    .finally(() => sendResponse(res, response));
};
