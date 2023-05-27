const express = require("express");
const router = express.Router();
const artistRouter = require("./artist.route");
const userRouter = require("./user.route");

router.use(artistRouter);
router.use(userRouter);

module.exports = router;
