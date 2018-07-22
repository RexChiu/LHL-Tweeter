"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const usersRoutes = express.Router();

module.exports = function(DataHelpers) {
  usersRoutes.get("/register", function(req, res) {
    res.render("register");
  });

  usersRoutes.post("/register", function(req, res) {
    //checks if user_id exists in cookie, search for user in DB
    let user_id = req.session.user_id;

    DataHelpers.findUser(user_id, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        //if user is found using registration email
        if (user) {
          res.status(500).json({ error: "Email already exists!" });
        }
      }
    });

    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.name ||
      !req.body.avatar
    ) {
      res
        .status(400)
        .json({ error: "invalid request: no valid data in POST body" });
      return;
    }

    let user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      avatar: req.body.avatar
    };

    DataHelpers.createUser(user, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.session.user_id = user.email;
        res.redirect("/");
      }
    });
  });

  return usersRoutes;
};
