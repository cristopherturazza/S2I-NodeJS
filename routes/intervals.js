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

const { celebrate, errors, Joi, Segments } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

// all intervals list
router.get("/", intervalList);

// search intervals by query
router.get("/search", searchIntervals);

// specific interval by Id
router.get("/:intervalId", intervalById);

// add a new interval
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      owner: Joi.objectId().required(),
      target: Joi.objectId().required(),
    }),
  }),
  addInterval
);

// delete interval by Id
router.delete("/:intervalId", removeInterval);

// update interval by Id
router.patch("/:intervalId", updateInterval);

router.use(errors());

module.exports = router;
