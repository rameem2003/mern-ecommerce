require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const connectDB = require("./config/db.config");
const app = express();
connectDB();

// all middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router); // http://localhost:5000/

// server home route
app.get("/", (req, res) => {
  res.status(200).send({
    msg: "MERN E-Commerce Backend",
    developed_by: "Republic of Legends",
  });
});

// error route
app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});

module.exports = app;
