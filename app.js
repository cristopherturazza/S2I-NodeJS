const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
const usersRoute = require("./routes/users");
const intervalsRoute = require("./routes/intervals");
const targetsRoute = require("./routes/targets");

// logger
app.use(morgan("dev"));

// body parser and query parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// security middlewares
app.use(helmet());

// sanitize filter
mongoose.set("sanitizeFilter", true);

// routes
app.use("/users", usersRoute);
app.use("/intervals", intervalsRoute);
app.use("/targets", targetsRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to MeditAPI. Read the API docs before use" });
});

// error 404
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
