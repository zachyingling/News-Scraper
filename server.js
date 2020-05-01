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

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
  db.Article.find({ saved: false }).lean().then(data => {
    res.render("index", { results: data });
  }).catch(err => {
    console.log(err);
  });
});

app.get("/saved", (req, res) => {
  db.Article.find({ saved: true }).lean().then(data => {
    res.render("saved", { results: data });
  }).catch(err => {
    console.log(err);
  });
});

app.post("/saved", (req, res) => {
  const dataID = Object.getOwnPropertyNames(req.body);
  db.Article.updateOne({ _id: dataID[0]}, { $set: { saved: true }}).then(function() {
    // Isn't working needs to refresh the page annd go to home route
    res.redirect("/");
  });
});

app.get("/scrape", (req, res) => {
  db.Article.deleteMany({ saved: false }, (err, result) => {
    if (err) {
      res.send(err);
    }
  });

  axios.get("https://www.infoworld.com/category/javascript/").then(response => {
    const $ = cheerio.load(response.data);

    $(".river-well.article").each(function(i, element) {
      const article = {};
      // Article bio
      article.bio = $(this).children(".post-cont").children("h4").text();

      // article link
      article.link = "https://www.infoworld.com" + $(this).children(".post-cont").children("h3").children().attr("href");

      // Article Header
      article.header = $(this).children(".post-cont").children("h3").children().text();

      db.Article.create(article).then(dbArticle => {
        console.log(dbArticle);
      }).catch(err => {
        console.log(err);
      });
    });
    res.send("Scrape completed");
  });
});

app.listen(PORT, () => {
  console.log("App running on https:/localhost:" + PORT + "/ !");
});
