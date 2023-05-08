const { Artist } = require("../models");
const data = require("../utils/data.json");

module.exports.getAll = function (req, res) {
  Artist.find()
    .sort({ _id: data.order.desc })
    .exec(function (err, artists) {
      if (err) {
        res
          .status(data.httpMessage.serverErrorCode)
          .send(data.httpMessage.serverError);
      } else {
        res.status(data.httpMessage.successCode).json(artists);
      }
    });
};

module.exports.getOne = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      res.status(data.httpMessage.successCode).json(artist);
    }
  });
};

module.exports.createOne = function (req, res) {
  const artist = req.body;
  Artist.create(artist, function (err) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(err.message);
    } else {
      res.status(data.httpMessage.successCode).send(data.httpMessage.success);
    }
  });
};

module.exports.updateOne = function (req, res) {
  const artist = req.body;
  const artistId = req.params.artistId;
  Artist.findByIdAndUpdate(artistId, artist).exec(function (err) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      res.status(data.httpMessage.successCode).send(data.httpMessage.success);
    }
  });
};

module.exports.deleteOne = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findByIdAndDelete(artistId).exec(function (err) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      res.status(data.httpMessage.successCode).send(data.httpMessage.success);
    }
  });
};
