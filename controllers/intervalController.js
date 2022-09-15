const Interval = require("../models/interval");
const Target = require("../models/target");

// sum days function

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// all intervals

const intervalList = async (req, res) => {
  try {
    const intervals = await Interval.find();
    res.status(200).json(intervals);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// interval by Id

const intervalById = async (req, res) => {
  try {
    const interval = await Interval.findById(req.params.intervalId);
    res.status(200).json(interval);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// filter interval by queries

const searchIntervals = async (req, res) => {
  const { owner, target, startdate, enddate } = req.query;
  let filteredIntervals = await Interval.find();

  if (owner) {
    filteredIntervals = filteredIntervals.filter(
      (interval) => interval.owner == owner
    );
  }
  if (target) {
    filteredIntervals = filteredIntervals.filter(
      (interval) => interval.target == target
    );
  }

  if (startdate) {
    const d = new Date(startdate);
    filteredIntervals = filteredIntervals.filter(
      (interval) => interval.startdate >= d
    );
  }
  if (enddate) {
    const d = new Date(enddate);
    filteredIntervals = filteredIntervals.filter(
      (interval) => interval.enddate <= d
    );
  }
  res.status(200).json(filteredIntervals);
};

// add a new interval

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

// remove an interval

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

// update an interval

const updateInterval = async (req, res) => {
  try {
    const updatedInterval = await Interval.updateOne(
      { _id: req.params.intervalId },
      {
        $set: {
          owner: req.body.owner,
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
