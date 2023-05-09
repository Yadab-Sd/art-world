const { Artist } = require("../models");
const data = require("../utils/data.json");
const { checkErrorAndGiveResponse } = require("../utils/methods");

module.exports.getAll = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec(function (err, arts) {
     checkErrorAndGiveResponse(err, res, arts)
    });
};

module.exports.getOne = function (req, res) {
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec(function (err, artist) {
      if (err) {
        res
          .status(data.http.serverErrorCode)
          .send(data.http.serverError);
      } else {
        res.status(data.http.successCode).json(artist.arts.id(artId));
      }
    });
};

module.exports.createOne = function (req, res) {
  const artistId = req.params.artistId;
  const art = req.body;
  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      res
        .status(data.http.serverErrorCode)
        .send(data.http.serverError);
    } else {
      if (artist.arts !== undefined) {
        artist.arts.push(art);
      } else {
        artist.arts = [art];
      }
      artist.save(function (err) {
        if (err) {
          res
            .status(data.http.serverErrorCode)
            .send(data.http.serverError);
        } else {
          res
            .status(data.http.successCode)
            .send(data.http.success);
        }
      });
    }
  });
};

module.exports.updateOne = function (req, res) {
  const art = req.body;
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  console.log("Update:", art);
  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      console.log(1, err);
      res
        .status(data.http.serverErrorCode)
        .send(data.http.serverError);
    } else {
      const old_art = artist.arts.id(artId);
      old_art.set(art);
      artist.save(function (err) {
        if (err) {
          console.log(2, err);
          res
            .status(data.http.serverErrorCode)
            .send(data.http.serverError);
        } else {
          res
            .status(data.http.successCode)
            .send(data.http.success);
        }
      });
    }
  });
};

module.exports.deleteOne = async function (req, res) {
  const artistId = req.params.artistId;
  const artId = req.params.artId;

  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      res
        .status(data.http.serverErrorCode)
        .send(data.http.serverError);
    } else {
      const art = artist.arts.id(artId);
      art.remove(function (err) {
        if (err) {
          res
            .status(data.http.serverErrorCode)
            .send(data.http.serverError);
        }
      });
      artist.save(function (err) {
        if (err) {
          res
            .status(data.http.serverErrorCode)
            .send(data.http.serverError);
        } else {
          res
            .status(data.http.successCode)
            .send(data.http.success);
        }
      });
    }
  });
};
