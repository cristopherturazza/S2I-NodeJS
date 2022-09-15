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

// all users list
router.get("/", userList);

//specific user by Id
router.get("/:userId", userById);

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
router.delete("/:userId", removeUser);

// update user by Id
router.patch("/:userId", updateUser);

router.use(errors());

module.exports = router;
