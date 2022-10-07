const Target = require("../models/target");

// get all targets

const targetList = async (req, res) => {
  try {
    const targets = await Target.find();
    res.status(200).json(targets);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// get a target by ID

const targetById = async (req, res) => {
  try {
    const target = await Target.findById(req.params.targetId);
    res.status(200).json(target);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// add a target

const addTarget = async (req, res) => {
  const target = new Target({
    title: req.body.title,
    description: req.body.description,
    days: req.body.days,
  });

  try {
    const savedTarget = await target.save();
    res.status(201).json(savedTarget);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// remove an target

const removeTarget = async (req, res) => {
  try {
    const removedTarget = await Target.deleteOne({
      _id: req.params.targetId,
    });
    res.status(200).json(removedTarget);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// update a target

const updateTarget = async (req, res) => {
  try {
    const updatedTarget = await Target.updateOne(
      { _id: req.params.targetId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          days: req.body.days,
        },
      }
    );
    res.status(200).json(updatedTarget);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const addTargetIntervals = async (req, res) => {
  try {
    const addInterval = await Target.updateOne(
      { _id: req.params.targetId },
      { $addToSet: { intervals: req.body.interval } }
    );
    res.status(200).json(addInterval);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const removeTargetIntervals = async (req, res) => {
  try {
    const removeInterval = await Target.updateOne(
      { _id: req.params.targetId },
      { $pull: { intervals: req.body.interval } }
    );
    res.status(200).json(removeInterval);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports = {
  targetList,
  targetById,
  addTarget,
  removeTarget,
  updateTarget,
  addTargetIntervals,
  removeTargetIntervals,
};
