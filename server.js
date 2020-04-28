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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_db";

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI);

// db.User.findOneAndUpdate();

app.get("/", (req, res) => {
  axios.get("https://www.infoworld.com/category/javascript/").then(response => {
    const $ = cheerio.load(response.data);
    const results = [];

    $(".river-well.article").each(function(i, element) {
      const article = {};
      // Article bio
      article.bio = $(this).children(".post-cont").children("h4").text();

      // article link
      article.link = "https://www.infoworld.com" + $(this).children(".post-cont").children("h3").children().attr("href");

      // Article Header
      article.header = $(this).children(".post-cont").children("h3").children().text();

      results.push(article);
    });
    console.log(results);
    res.render("index", { results: results });
  });
});

app.get("/saved", (req, res) => {
  res.render("saved");
});

app.listen(PORT, () => {
  console.log("App running on https:/localhost:" + PORT + "/ !");
});
