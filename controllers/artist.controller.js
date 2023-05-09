const { Artist } = require("../models");
const data = require("../utils/data.json");

module.exports.getAll = function (req, res) {
  let offset = 0;
  let count = 6;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (req.query && req.query.lat && req.query.lng) {
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
      .exec(function (err, artists) {
        if (err) {
          res
            .status(data.httpMessage.serverErrorCode)
            .send(data.httpMessage.serverError);
        } else {
          res.status(data.httpMessage.successCode).json(artists);
        }
      });
  } else {
    Artist.find()
      .skip(offset)
      .limit(count)
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
  }
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
      res.status(data.httpMessage.serverErrorCode).send(err.message);
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
