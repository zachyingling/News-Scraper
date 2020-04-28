const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;