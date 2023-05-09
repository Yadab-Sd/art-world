const data = require("../utils/data.json");
const { Artist } = require("../models");

const responseInternalError = function (response, res) {};

const checkErrorAndGiveResponse = function (err, res, outData) {
  const response = {
    status: data.http.success.code,
    message: outData,
  };
  if (err) {
    response.status = data.http.serverError.code;
    response.message = err;
  } else if (!outData) {
    response.status = data.http.notFound.code;
    response.message = data.http.notFound.message;
  }
  res.status(response.status).json(response.message);
};

const updateOneArtist = function (req, res, formatDataCallback) {
  if (req.body) {
    const formatedArtistForUpdate = formatDataCallback(req.body);
    const artistId = req.params.artistId;
    Artist.findById(artistId).exec(function (err, artist) {
      artist.set(formatedArtistForUpdate);
      artist.save(function (err, updatedArtist) {
        checkErrorAndGiveResponse(err, res, updatedArtist);
      });
    });
  } else {
    res
      .status(data.http.invalidUserInput.code)
      .json(data.http.invalidUserInput.message);
  }
};

module.exports = {
  checkErrorAndGiveResponse,
  updateOneArtist,
};
