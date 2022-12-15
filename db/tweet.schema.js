const Schema = require("mongoose").Schema;

exports.TweetSchema = new Schema(
  {
    // pass in user instead of string
    name: String,
    // user: String,
    // health: Number,
    // date: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { collection: "tweet" }
);
