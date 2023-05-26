const { Artist } = require("../models");
const data = require("../utils/data.json");
const {
  checkErrorAndGiveResponse,
  checkErrorAndDoCallback,
  updateOneArtist,
} = require("../utils/methods");

module.exports.getAll = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec(function (err, artist) {
      const _afterGettingArtistSuccessfully = function () {
        checkErrorAndGiveResponse(err, res, artist.arts);
      };
      checkErrorAndDoCallback(
        err,
        res,
        artist,
        _afterGettingArtistSuccessfully
      );
    });
};

module.exports.getOne = function (req, res) {
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec(function (err, artist) {
      const _afterGettingArtistSuccessfully = function () {
        checkErrorAndGiveResponse(err, res, artist.arts.id(artId));
      };
      checkErrorAndDoCallback(
        err,
        res,
        artist,
        _afterGettingArtistSuccessfully
      );
    });
};

module.exports.createOne = function (req, res) {
  const artistId = req.params.artistId;
  const art = req.body;
  Artist.findById(artistId).exec(function (err, artist) {
    const formatDataCallback = function () {
      console.log(artist.arts);
      if (artist.arts !== undefined) {
        artist.arts.push(art);
      } else {
        artist.arts = [art];
      }
      console.log(1, artist)
      return artist;
    };
    const _afterGettingArtistSuccessfully = function () {
      updateOneArtist(req, res, formatDataCallback);
    };
    checkErrorAndDoCallback(err, res, artist, _afterGettingArtistSuccessfully);
  });
};

module.exports.updateOne = function (req, res) {
  const art = req.body;
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId).exec(function (err, artist) {
    const formatDataCallback = function () {
      const old_art = artist.arts.id(artId);
      old_art.set(art);
      return artist;
    };
    const _afterGettingArtistSuccessfully = function () {
      updateOneArtist(req, res, formatDataCallback);
    };
    checkErrorAndDoCallback(err, res, artist, _afterGettingArtistSuccessfully);
  });
};

module.exports.deleteOne = async function (req, res) {
  const artistId = req.params.artistId;
  const artId = req.params.artId;

  Artist.findById(artistId).exec(function (err, artist) {
    const formatDataCallback = function () {
      const art = artist.arts.id(artId);
      art.remove(function (err) {
        if (err) {
          res.status(data.http.serverErrorCode).send(data.http.serverError);
        }
      });
      return artist;
    };
    const _afterGettingArtistSuccessfully = function () {
      updateOneArtist(req, res, formatDataCallback);
    };
    checkErrorAndDoCallback(err, res, artist, _afterGettingArtistSuccessfully);
  });
};
