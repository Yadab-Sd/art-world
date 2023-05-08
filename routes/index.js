const express = require("express");
const router = express.Router();
const artistRouter = require("./artist.route");

router.use(artistRouter);

module.exports = router;
