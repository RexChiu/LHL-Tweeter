"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const usersRoutes = express.Router();

module.exports = function(DataHelpers) {
  usersRoutes.get("/login", function(req, res) {
    let templateVars = {
      cookie: req.session
    };

    res.render("login", templateVars);
  });

  usersRoutes.get("/register", function(req, res) {
    let templateVars = {
      cookie: req.session
    };

    res.render("register", templateVars);
  });

  //handles user login
  usersRoutes.post("/login", function(req, res) {
    let inputHandle = req.body.handle;
    let inputPassword = req.body.password;

    //finds username in database
    DataHelpers.findUser(inputHandle, function(err, user) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!user) {
        res.status(500).send("No User Found!");
      } else {
        //compares hashed password with one stored in db
        if (bcrypt.compareSync(inputPassword, user.password)) {
          req.session.user_id = user.handle;
          res.redirect("../");
          return;
        } else {
          res.status(500).send("Wrong Password!");
        }
      }
    });
  });

  //user attempting to login using credentials
  usersRoutes.post("/register", function(req, res) {
    res.error = null;
    res.success = null;

    //grabs user_id from cookie, validates if user is already logged in
    let user_id = req.session.user_id;

    //searches through database to see user_id exists in database
    DataHelpers.findUser(user_id, function(err, user) {
      if (err) {
        res.status(500).json({ error: err.message });
        res.error = true;
      } else {
        //if user is found, redirect to index
        if (user) {
          console.log("index");
          res.redirect("index");
          res.success = true;
        }
      }
    });

    //checks if all input fields are present
    if (!req.body.handle || !req.body.password || !req.body.avatar) {
      res
        .status(400)
        .json({ error: "invalid request: no valid data in POST body" });
      res.error = true;
      return;
    }

    //breaks out of function if any error or success has been detected
    if (res.error || res.success) return;

    if (!res.error && !res.success) {
      //searches through database to see if handle exists already
      DataHelpers.findUser(req.body.handle, function(err, user) {
        if (err) {
          res.status(500).json({ error: err.message });
          res.error = true;
        } else {
          //if user is found using registration email
          if (user) {
            res.status(500).send({ error: "Handle already exists!" });
            res.error = true;
            return;
          } else {
            let user = {
              handle: req.body.handle,
              password: bcrypt.hashSync(req.body.password, 10),
              avatar: req.body.avatar
            };

            if (!res.error && !res.success) {
              console.log("should not be here.");
              console.log(res.error, res.success);
              DataHelpers.createUser(user, err => {
                if (err) {
                  res.status(500).json({ error: err.message });
                  res.error = true;
                } else {
                  req.session.user_id = user.handle;
                  res.success = true;
                  res.redirect("../");
                  return;
                }
              });
            }
          }
        }
      });
    }
  });

  return usersRoutes;
};
