const Schema = require("mongoose").Schema;

exports.TweetSchema = new Schema(
  {
    name: String,
    owner: String,
    health: Number,
  },
  { collection: "tweet" }
);
