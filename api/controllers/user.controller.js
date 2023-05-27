const { User } = require("../models");
const {
  checkBodyAndDoCallback,
  sendResponse,
  setInternalServerError,
  generateHashBySalt,
  createUser,
  createResponse,
  formatUserBody,
  checkUserExists,
  comparePassword,
  checkPasswordMatching,
  generateSalt,
  generateToken,
  handleError,
} = require("../utils/methods");

module.exports.register = function (req, res) {
  const response = createResponse();
  const afterBodyFound = function () {
    const user = formatUserBody(req);
    generateSalt()
      .then((salt) => generateHashBySalt(user.password, salt, response))
      .then((encryptedPassword) =>
        createUser(user, encryptedPassword, response)
      )
      .catch((err) => setInternalServerError(response))
      .finally(() => sendResponse(res, response));
  };
  checkBodyAndDoCallback(req, afterBodyFound);
};

module.exports.login = function (req, res) {
  const response = createResponse();
  const afterBodyFound = function () {
    const userBody = formatUserBody(req);
    User.findOne({ username: userBody.username })
      .then((user) => checkUserExists(user, response))
      .then((user) => generateSalt())
      .then((salt) => generateHashBySalt(userBody.password, salt, response))
      .then((encryptedPassword) =>
        comparePassword(userBody, encryptedPassword)
      )
      .then((isPasswordMatched) =>
        checkPasswordMatching(isPasswordMatched, response)
      )
      .then(() => generateToken(response))
      .catch((err) => handleError(err, response))
      .finally(() => sendResponse(res, response));
  };

  checkBodyAndDoCallback(req, afterBodyFound);
};
