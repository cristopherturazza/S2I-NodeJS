const express = require("express");
const router = express.Router();
const {
  intervalList,
  intervalById,
  addInterval,
  searchIntervals,
  removeInterval,
  updateInterval,
} = require("../controllers/intervalController");

// all intervals list
router.get("/", intervalList);

// search intervals by query
router.get("/search", searchIntervals);

// specific interval by Id
router.get("/:intervalId", intervalById);

// add a new interval
router.post("/", addInterval);

// delete interval by Id
router.delete("/:intervalId", removeInterval);

// update interval by Id
router.patch("/:intervalId", updateInterval);

module.exports = router;
