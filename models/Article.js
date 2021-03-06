const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  bio: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },

  header: {
    type: String,
    required: true
  },

  saved: {
    type: Boolean,
    required: true,
    default: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;