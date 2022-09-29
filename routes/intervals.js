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
router.get(
  "/search",
  celebrate({
    [Segments.QUERY]: Joi.object()
      .keys({
        owner: Joi.objectId(),
        startdate: Joi.date().iso(),
        enddate: Joi.date().iso(),
      })
      .unknown(),
  }),
  searchIntervals
);

// specific interval by Id
router.get(
  "/:intervalId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        intervalId: Joi.objectId(),
      })
      .unknown(),
  }),
  intervalById
);

// add a new interval
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      owner: Joi.objectId().required(),
      startdate: Joi.date().iso(),
      enddate: Joi.date().iso(),
    }),
  }),
  addInterval
);

// delete interval by Id
router.delete(
  "/:intervalId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        intervalId: Joi.objectId(),
      })
      .unknown(),
  }),
  removeInterval
);

// update interval by Id
router.patch(
  "/:intervalId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        intervalId: Joi.objectId(),
      })
      .unknown(),
  }),
  updateInterval
);

router.use(errors());

module.exports = router;
