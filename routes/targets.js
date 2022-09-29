const express = require("express");
const router = express.Router();
const {
  targetList,
  targetById,
  addTarget,
  removeTarget,
  updateTarget,
} = require("../controllers/targetController");

const { celebrate, errors, Joi, Segments } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

// all targets list
router.get("/", targetList);

router.get(
  "/:targetId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
  }),
  targetById
);

// add a new interval
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(2).max(30).required(),
      description: Joi.string().min(2).max(200).required(),
      days: Joi.number().min(1).required(),
      intervals: Joi.objectId(),
    }),
  }),
  addTarget
);

// delete interval by Id
router.delete(
  "/:intervalId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
  }),
  removeTarget
);

// update interval by Id
router.patch(
  "/:intervalId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
  }),
  updateTarget
);

router.use(errors());

module.exports = router;
