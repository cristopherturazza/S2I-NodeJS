const express = require("express");
const router = express.Router();
const Interval = require("../models/interval");

// all intervals list
router.get("/", async (req, res) => {
  try {
    const intervals = await Interval.find();
    res.json(intervals);
  } catch (err) {
    res.json({ message: err });
  }
});

//specific interval by Id
router.get("/:intervalId", async (req, res) => {
  try {
    const interval = await User.findById(req.params.intervalId);
    res.json(interval);
  } catch (err) {
    res.json({ message: err });
  }
});

//add a new interval
router.post("/", async (req, res) => {
  const interval = new Interval({
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    userid: req.body.userid,
  });

  try {
    const savedInterval = await interval.save();
    res.json(savedInterval);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete interval by Id
router.delete("/:intervalId", async (req, res) => {
  try {
    const removedInterval = await Interval.remove({
      _id: req.params.intervalId,
    });
    res.json(removedInterval);
  } catch (err) {
    res.json({ message: err });
  }
});

// update interval by Id
router.patch("/:intervalId", async (req, res) => {
  try {
    const updatedInterval = await User.updateOne(
      { _id: req.params.intervalId },
      {
        $set: {
          startdate: req.body.startdate,
          enddate: req.body.enddate,
          userid: req.body.userid,
        },
      }
    );
    res.json(updatedInterval);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
