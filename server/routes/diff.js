const express = require("express");
const diffcalc = require("../controllers/diff");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../config/cors");

router.post("/api/diffcalc", cors(corsOptions), diffcalc);

module.exports = router;