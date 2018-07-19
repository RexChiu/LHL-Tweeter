"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      // db.tweets.push(newTweet);
      // callback(null, true);

      db.collection("tweets").insertOne(newTweet, (err, id) => {
        if (err) {
          return callback(err);
        }
        callback(null, id);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
      }
      callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
};
