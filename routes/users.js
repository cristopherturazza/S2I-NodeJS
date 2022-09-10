const express = require("express");
const router = express.Router();
const {
  userList,
  userById,
  addUser,
  removeUser,
  updateUser,
} = require("../controllers/userController");

// all users list
router.get("/", userList);

//specific user by Id
router.get("/:userId", userById);

//add a new user
router.post("/", addUser);

// delete user by Id
router.delete("/:userId", removeUser);

// update user by Id
router.patch("/:userId", updateUser);

module.exports = router;
