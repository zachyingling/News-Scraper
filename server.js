const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/saved", (req, res) => {
  res.render("saved");
});

app.listen(PORT, () => {
  console.log("App running on https:/localhost:" + PORT + "/ !");
});
