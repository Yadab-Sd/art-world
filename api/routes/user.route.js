const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const data = require("../utils/data.json");

userRouter.route(data.paths.user.all).post(userController.register);
userRouter.route(data.paths.user.login).post(userController.login);

module.exports = userRouter;
