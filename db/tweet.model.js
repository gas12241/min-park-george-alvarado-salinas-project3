const mongoose = require("mongoose");

const TweetSchema = require("./tweet.schema").TweetSchema;

const TweetModel = mongoose.model("Tweet", TweetSchema);

function insertTweet(tweet) {
  return TweetModel.create(tweet);
}

function getAllTweets() {
  return TweetModel.find().exec();
}

// function getAllPokemonHealthAbove10() {
//   return PokemonModel.find({
//     health: {
//       $gte: 10,
//     },
//   }).exec();
// }

function getTweetById(id) {
  return TweetModel.findById(id).exec();
}

function getTweetByUser(user) {
  return TweetModel.find({
    user: user,
  }).exec();
}

module.exports = {
  insertTweet,
  getAllTweets,
  getTweetById,
  // getAllPokemonHealthAbove10,
  getTweetByUser,
};
