const { Artist } = require("../models");
const data = require("../utils/data.json");
const {
  checkErrorAndGiveResponse,
  updateOneArtist,
} = require("../utils/methods");

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
        checkErrorAndGiveResponse(err, res, artists);
      });
  } else {
    Artist.find()
      .skip(offset)
      .limit(count)
      .sort({ _id: data.order.desc })
      .exec(function (err, artists) {
        checkErrorAndGiveResponse(err, res, artists);
      });
  }
};

module.exports.getOne = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findById(artistId).exec(function (err, artist) {
    checkErrorAndGiveResponse(err, res, artist);
  });
};

module.exports.createOne = function (req, res) {
  const artist = req.body;
  Artist.create(artist, function (err, createdArtist) {
    checkErrorAndGiveResponse(err, res, createdArtist);
  });
};

module.exports.partialUpdateOne = function (req, res) {
  const _formatDataForFullUpdate = function (data) {
    const formatedData = {};
    if (data.location && (data.location.address || data.location.coordinates)) {
      formatedData.location = {};
      if (data.location.address) {
        formatedData.location.address = data.location.address;
      }
      if (data.location.coordinates) {
        formatedData.location.coordinates = data.location.coordinates;
      }
    }
    if (data.name) {
      formatedData.name = data.name;
    }
    if (data.dateOfBirth) {
      formatedData.dateOfBirth = data.dateOfBirth;
    }
    if (data.rating) {
      formatedData.rating = data.rating;
    }
    if (data.cost) {
      formatedData.cost = data.cost;
    }
    return formatedData;
  };

  updateOneArtist(req, res, _formatDataForFullUpdate);
};

module.exports.fullUpdateOne = function (req, res) {
  const _formatDataForPartialUpdate = function (data) {
    const formatedData = {
      location: {
        address: data.location && data.location.address,
        coordinates: data.location && data.location.coordinates,
      },
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      rating: data.rating,
      cost: data.cost,
    };
    return formatedData;
  };

  updateOneArtist(req, res, _formatDataForPartialUpdate);
};

module.exports.deleteOne = function (req, res) {
  const artistId = req.params.artistId;
  Artist.findByIdAndDelete(artistId).exec(function (err) {
    checkErrorAndGiveResponse(err, res, data.http.deleted.essage);
  });
};
