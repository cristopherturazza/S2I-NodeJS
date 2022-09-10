const Interval = require("../models/interval");

const intervalList = async (req, res) => {
  try {
    const intervals = await Interval.find();
    res.status(200).json(intervals);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const intervalById = async (req, res) => {
  try {
    const interval = await Interval.findById(req.params.intervalId);
    res.status(200).json(interval);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const addInterval = async (req, res) => {
  const interval = new Interval({
    owner: req.body.owner,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    target: req.body.target,
  });
  try {
    const savedInterval = await interval.save();
    res.status(200).json(savedInterval);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const removeInterval = async (req, res) => {
  try {
    const removedInterval = await Interval.deleteOne({
      _id: req.params.intervalId,
    });
    res.status(200).json(removedInterval);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const updateInterval = async (req, res) => {
  try {
    const updatedInterval = await Interval.updateOne(
      { _id: req.params.intervalId },
      {
        $set: {
          owner: req.body.owner,
          startdate: req.body.startdate,
          enddate: req.body.enddate,
          target: {
            title: req.body.title,
            description: req.body.description,
            progress: req.body.progress,
          },
        },
      }
    );
    res.status(200).json(updatedInterval);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  intervalList,
  intervalById,
  addInterval,
  removeInterval,
  updateInterval,
};
