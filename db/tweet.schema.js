const Schema = require("mongoose").Schema;

exports.TweetSchema = new Schema(
  {
    name: String,
    owner: String,
    health: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "tweet" }
);
