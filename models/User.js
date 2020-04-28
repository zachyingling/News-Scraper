const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;