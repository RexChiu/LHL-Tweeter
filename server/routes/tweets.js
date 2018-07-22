"use strict";

const express = require("express");
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {
  // GET /tweets
  //returns all tweets in json format
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  // POST /tweets
  // handles creating a new tweet, only allows a logged in user to create
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    //grabs user_id from cookie
    let user_id = req.session.user_id;

    //searches through database to see user_id exists in database
    DataHelpers.findUser(user_id, function(err, user) {
      if (err) {
        res.status(500).json({ error: err.message });
        res.error = true;
      } else {
        //if user is not found, give error
        if (!user) {
          res
            .status(400)
            .json({ error: "Need to be logged in to compose tweet" });
        } else {
          //construct tweet and save to DB
          const tweet = {
            user: {
              name: user.name,
              avatar: user.avatar,
              handle: user.handle
            },
            content: {
              text: req.body.text
            },
            created_at: Date.now(),
            likes: 0
          };

          DataHelpers.saveTweet(tweet, err => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(201).send();
            }
          });
        }
      }
    });
  });

  // PUT /tweets/likes
  // changes the likes of a tweet
  tweetsRoutes.put("/likes", function(req, res) {
    if (!req.body.id) {
      res.status(401).json({ error: "invalid request: no data in PUT body" });
      return;
    }

    //finds tweet by its ID, changes likes accordingly
    const id = req.body.id;
    const change = req.body.change;

    DataHelpers.modifyLikes(id, change, err => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).send();
      }
    });

    res.status(200).send();
  });

  return tweetsRoutes;
};
