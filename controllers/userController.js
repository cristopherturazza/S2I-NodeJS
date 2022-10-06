const User = require("../models/user");

const userList = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw "not found";
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const userById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw "not found";
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const addUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const removeUser = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.status(200).json(removedUser);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
        },
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports = {
  userList,
  userById,
  addUser,
  removeUser,
  updateUser,
};
