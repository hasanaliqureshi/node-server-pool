const express = require("express");
const createHash = require("../socket_controllers/createHash");
const updateHash = require("../socket_controllers/updateHash");
const router = express.Router();

router.post("/api/createhash", createHash);
router.post("/api/updateHash", updateHash);

module.exports = router;