const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//dotenv for db uri
require("dotenv").config();

const app = express();
const usersRoute = require("./routes/users");
const intervalsRoute = require("./routes/intervals");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRoute);
app.use("/intervals", intervalsRoute);

//connect to the db with mongoose
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// error 404
app.use((req, res) => {
  res.status(404);
});
