const data = require("./data.json");
const { Artist, User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { promisify } = require("util");

const createResponse = function () {
  const response = {
    status: data.http.success.code,
    message: data.http.success.message,
  };
  return response;
};

const setInternalServerError = function (response) {
  response.status = data.http.serverError.code;
  response.message = data.http.serverError.message;
};

const setError = function (error, response) {
  response.status = error.status;
  response.message = error.message;
};

const setNotFoundError = function (response) {
  response.status = data.http.notFound.code;
  response.message = data.http.notFound.message;
};

const setInvalidUserInputError = function (response) {
  response.status = data.http.invalidUserInput.code;
  response.message = data.http.invalidUserInput.message;
};

const setUnauthenticatedError = function (response) {
  response.status = data.http.unauthenticated.code;
  response.message = data.http.unauthenticated.message;
};

const setUnauthorizededError = function (response) {
  response.status = data.http.unauthorized.code;
  response.message = data.http.unauthorized.message;
};

const handleError = function (error, response) {
  const base_response = createResponse();
  console.log(1, error, response);
  if (response.status == base_response.status) {
    setInternalServerError(response);
  } else {
    setError(error, response);
  }
  console.log(2, response);
};

const sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

const checkContentAndSetResponse = function (data, response) {
  return new Promise((resolve, reject) => {
    if (data) {
      response.message = data;
      resolve(data);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const checkErrorAndDoCallback = function (err, res, artist, successCallback) {
  const response = createResponse();
  if (err) {
    setInternalServerError(response);
  } else if (!artist) {
    setNotFoundError(response);
  }
  if (response.status === data.http.success.code) {
    successCallback();
  } else {
    sendResponse(res, response);
  }
};

const updateOneArtist = function (existingArtist, newArtist) {
  if (newArtist) {
    existingArtist.set(newArtist);
  }
  return existingArtist.save();
};

const addArt = function (artist, art, response) {
  return new Promise((resolve, reject) => {
    if (artist) {
      if (artist.arts !== undefined) {
        artist.arts.push(art);
      } else {
        artist.arts = [art];
      }
      resolve(artist);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const updateArt = function (artist, artId, art, response) {
  return new Promise((resolve, reject) => {
    if (artist && artist.arts && artist.arts.id(artId)) {
      const old_art = artist.arts.id(artId);
      old_art.set(art);
      resolve(artist);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const removeArt = function (artist, artId, response) {
  return new Promise((resolve, reject) => {
    if (artist && artist.arts && artist.arts.id(artId)) {
      artist.arts = artist.arts.filter((art) => {
        if (art._id == artId) {
          return;
        }
        return art;
      });
      resolve(artist);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const getAllArtsFromArtist = function (artist, response) {
  return new Promise((resolve, reject) => {
    if (artist) {
      response.message = artist.arts;
      resolve(data);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const getOneArtFromArtist = function (artist, artId, response) {
  return new Promise((resolve, reject) => {
    if (artist && artist.arts && artist.arts.id(artId)) {
      response.message = artist.arts.id(artId);
      resolve(data);
    } else {
      setNotFoundError(response);
      reject(response);
    }
  });
};

const checkBodyAndDoCallback = function (req, bodyOkCallback) {
  const response = createResponse();
  if (!req.body) {
    setInvalidUserInputError(response);
  } else {
    bodyOkCallback();
  }
};

const generateHashBySalt = function (password, salt, response) {
  return bcrypt.hash(password, salt);
};

const createUser = function (user, encryptedPassword, response) {
  user.password = encryptedPassword;
  return User.create(user);
};

const checkUserExists = function (user, response) {
  return new Promise((resolve, reject) => {
    if (user) {
      response.user = user;
      resolve(user);
    } else {
      setUnauthenticatedError(response);
      reject(response);
    }
  });
};

const formatUserBody = function (req) {
  let user = {};
  if (req.body) {
    user = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };
  }
  return user;
};

const generateSalt = function () {
  const saltRound = parseInt(process.env.DB_SALT_ROUND);
  return bcrypt.genSalt(saltRound);
};

const comparePassword = function (user, encryptedPassword) {
  return bcrypt.compare(user.password, encryptedPassword);
};

const checkPasswordMatching = function (isPasswordMatched, response) {
  return new Promise((resolve, reject) => {
    if (isPasswordMatched) {
      resolve(true);
    } else {
      setUnauthenticatedError(response);
      reject(response);
    }
  });
};

const generateToken = function (response) {
  const payload = {
    name: response.user.name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_CODE, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });
  response.message = {
    token: token,
  };
};

const authenticateToken = function (req, res, next) {
  const response = createResponse();
  const tokenRequiredActions = ["PUT", "PATCH", "DELETE", "POST"];
  if (tokenRequiredActions.includes(req.method)) {
    const authorization = req.headers[data.httpHeaders.authorization.key];
    const token = authorization && authorization.split(" ")[1];
    const jwtVerify = promisify(jwt.verify);

    if (token) {
      jwtVerify(token, process.env.JWT_SECRET_CODE)
        .then(() => {
          next();
        })
        .catch((error) => {
          console.log(error);
          setUnauthorizededError(response);
          sendResponse(res, response);
        });
    } else {
      setUnauthorizededError(response);
      sendResponse(res, response);
    }
  } else {
    next();
  }
};

const parseOffsetAndCount = function (req) {
  let offset = data.query.defaultOffset;
  let count = data.query.defaultCount;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
    if (count > data.query.maxCount) {
      count = data.query.maxCount;
    }
  }
  return {
    offset: offset,
    count: count,
  };
};

const formatDataForFullUpdate = function (req) {
  const data = req.body;
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

const formatDataForPartialUpdate = function (req) {
  const data = req.body;
  const formatedData = {
    location: {
      address: data.location && data.location.address,
      coordinates: data.location && data.location.coordinates,
    },
    name: data.name,
    dateOfBirth: data.dateOfBirth,
    rating: data.rating,
    cost: data.cost,
    email: data.email,
    image: data.image,
  };
  return formatedData;
};

module.exports = {
  createResponse,
  setInternalServerError,
  setNotFoundError,
  setInvalidUserInputError,
  handleError,
  sendResponse,
  checkContentAndSetResponse,
  checkErrorAndDoCallback,
  updateOneArtist,
  checkBodyAndDoCallback,
  generateHashBySalt,
  createUser,
  formatUserBody,
  checkUserExists,
  comparePassword,
  checkPasswordMatching,
  generateSalt,
  generateToken,
  authenticateToken,
  parseOffsetAndCount,
  formatDataForFullUpdate,
  formatDataForPartialUpdate,
  addArt,
  updateArt,
  removeArt,
  getAllArtsFromArtist,
  getOneArtFromArtist,
};
