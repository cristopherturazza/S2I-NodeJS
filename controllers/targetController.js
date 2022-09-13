const Target = require("../models/target");

const targetList = async (req, res) => {
  try {
    const targets = await Target.find();
    res.status(200).json(targets);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { targetList };
