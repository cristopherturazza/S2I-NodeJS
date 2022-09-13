const express = require("express");
const router = express.Router();
const { targetList } = require("../controllers/targetController");

// all targets list
router.get("/", targetList);

module.exports = router;
