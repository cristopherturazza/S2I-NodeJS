const express = require("express");
const router = express.Router();
const {
  userList,
  userById,
  addUser,
  removeUser,
  updateUser,
} = require("../controllers/userController");

const { celebrate, Joi, errors, Segments } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

// all users list
router.get("/", userList);

//specific user by Id
router.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        userId: Joi.objectId(),
      })
      .unknown(),
  }),
  userById
);

//add a new user
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().alphanum().min(2).max(30).required(),
      surname: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  }),
  addUser
);

// delete user by Id
router.delete(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        userId: Joi.objectId(),
      })
      .unknown(),
  }),
  removeUser
);

// update user by Id
router.patch(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object()
      .keys({
        userId: Joi.objectId(),
      })
      .unknown(),
  }),
  updateUser
);

router.use(errors());

module.exports = router;
