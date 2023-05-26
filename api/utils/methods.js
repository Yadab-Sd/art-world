const data = require("./data.json");
const { Artist } = require("../models");

const _setInternalServerError = function (response, err) {
  response.status = data.http.serverError.code;
  response.message = err;
};

const _setNotFoundError = function (response) {
  response.status = data.http.notFound.code;
  response.message = data.http.notFound.message;
};

const _setInvalidUserInputError = function (response) {
  response.status = data.http.invalidUserInput.code;
  response.message = data.http.invalidUserInput.message;
};

const _sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

const checkErrorAndGiveResponse = function (err, res, outData) {
  const response = {
    status: data.http.success.code,
    message: outData,
  };
  if (err) {
    _setInternalServerError(response, err);
  } else if (!outData) {
    _setNotFoundError(response);
  }
  _sendResponse(res, response);
};

const checkErrorAndDoCallback = function (err, res, artist, successCallback) {
  const response = {
    status: data.http.success.code,
    message: data.http.success.message,
  };
  if (err) {
    _setInternalServerError(response, err);
  } else if (!artist) {
    _setNotFoundError(response);
  }

  if (response.status === data.http.success.code) {
    successCallback();
  } else {
    _sendResponse(res, response);
  }
};

const updateOneArtist = function (req, res, getFormatedDataToUpdate) {
  const response = {
    status: data.http.success.code,
    message: data.http.success.message,
  };
  if (req.body) {
    const formatedArtistForUpdate = getFormatedDataToUpdate();
    const artistId = req.params.artistId;
    const artId = req.params.artId;
    Artist.findById(artistId).exec(function (err, artist) {
      if (err) {
        _setInternalServerError(response, err);
      } else if (!artist) {
        _setNotFoundError(response);
      }

      if (response.status === data.http.success.code) {
        console.log(2, formatedArtistForUpdate)
        artist.set(formatedArtistForUpdate);
        console.log(3, artist)
        artist.save(function (err, updatedArtist) {
          console.log(4, updatedArtist, err)

          if (err) {
            _setInternalServerError(response, err);
          } else {

            if (artId) {
              response.message = updatedArtist.arts.id(artId);
            } else {
              response.message = updatedArtist;
            }
          }
        });
      }
    });
  } else {
    _setInvalidUserInputError(response);
  }
  
  _sendResponse(res, response);
};

module.exports = {
  checkErrorAndGiveResponse,
  checkErrorAndDoCallback,
  updateOneArtist,
};
