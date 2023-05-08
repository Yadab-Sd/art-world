const { Artist } = require("../models");
const data = require("../utils/data.json");

module.exports.getAll = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findById(artistId)
    .select(data.db.collection.arts)
    .exec(function (err, artist) {
      if (err) {
        res
          .status(data.httpMessage.serverErrorCode)
          .send(data.httpMessage.serverError);
      } else {
        res.status(data.httpMessage.successCode).json(artist.arts);
      }
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
          .status(data.httpMessage.serverErrorCode)
          .send(data.httpMessage.serverError);
      } else {
        res.status(data.httpMessage.successCode).json(artist.arts.id(artId));
      }
    });
};

module.exports.createOne = function (req, res) {
  const artistId = req.params.artistId;
  const art = req.body;
  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      if (artist.arts !== undefined) {
        artist.arts.push(art);
      } else {
        artist.arts = [art];
      }
      artist.save(function (err) {
        if (err) {
          res
            .status(data.httpMessage.serverErrorCode)
            .send(data.httpMessage.serverError);
        } else {
          res
            .status(data.httpMessage.successCode)
            .send(data.httpMessage.success);
        }
      });
    }
  });
};

module.exports.updateOne = function (req, res) {
  const art = req.body;
  const artistId = req.params.artistId;
  const artId = req.params.artId;
  Artist.findById(artistId).exec(function (err, artist) {
    if (err) {
      res
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      const old_art = artist.arts.id(artId);
      old_art.set(art);
      artist.save(function (err) {
        if (err) {
          res
            .status(data.httpMessage.serverErrorCode)
            .send(data.httpMessage.serverError);
        } else {
          res
            .status(data.httpMessage.successCode)
            .send(data.httpMessage.success);
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
        .status(data.httpMessage.serverErrorCode)
        .send(data.httpMessage.serverError);
    } else {
      const art = artist.arts.id(artId);
      art.remove(function (err) {
        if (err) {
          res
            .status(data.httpMessage.serverErrorCode)
            .send(data.httpMessage.serverError);
        }
      });
      artist.save(function (err) {
        if (err) {
          res
            .status(data.httpMessage.serverErrorCode)
            .send(data.httpMessage.serverError);
        } else {
          res
            .status(data.httpMessage.successCode)
            .send(data.httpMessage.success);
        }
      });
    }
  });
};
