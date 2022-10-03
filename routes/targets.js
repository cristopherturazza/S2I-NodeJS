const express = require("express");
const router = express.Router();
const {
  targetList,
  targetById,
  addTarget,
  removeTarget,
  updateTarget,
  addTargetIntervals,
  removeTargetIntervals,
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

// add a new target
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(2).max(30).required(),
      description: Joi.string().min(2).max(200).required(),
      days: Joi.number().min(1).required(),
    }),
  }),
  addTarget
);

// delete interval by Id
router.delete(
  "/:targetId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
  }),
  removeTarget
);

// update target by Id
router.patch(
  "/:targetId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(2).max(30),
      description: Joi.string().min(2).max(200),
      days: Joi.number().min(1),
    }),
  }),
  updateTarget
);

// add an interval for a target
router.delete(
  "/:targetId/intervals",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object()
      .keys({
        interval: Joi.objectId(),
      })
      .unknown(),
  }),
  removeTargetIntervals
);

// remove an interval from a target

router.patch(
  "/:targetId/intervals",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        targetId: Joi.objectId(),
      })
      .unknown(),
    [Segments.BODY]: Joi.object()
      .keys({
        interval: Joi.objectId(),
      })
      .unknown(),
  }),
  addTargetIntervals
);

router.use(errors());

module.exports = router;
