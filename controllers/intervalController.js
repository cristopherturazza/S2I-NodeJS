const Interval = require("../models/interval");
const Target = require("../models/target");

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

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

const searchIntervals = async (req, res) => {
  const { target, startdate, enddate } = req.query;
  let filteredIntervals = await Interval.find();

  if (target) {
    filteredIntervals = filteredIntervals.filter(
      (interval) => interval.target == target
    );
  }
  res.status(200).json(filteredIntervals);
};

const addInterval = async (req, res) => {
  const target = await Target.findById(req.body.target);
  const today = new Date();
  const interval = new Interval({
    owner: req.body.owner,
    target: req.body.target,
    startdate: today,
    enddate: today.addDays(target.days),
  });
  try {
    const savedInterval = await interval.save();
    res.status(201).json(savedInterval);
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
          target: req.body.target,
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
  searchIntervals,
  removeInterval,
  updateInterval,
};
