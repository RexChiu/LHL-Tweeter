"use strict";

const express = require("express");
const bcrypt = require("bcrypt");

const usersRoutes = express.Router();

module.exports = function(DataHelpers) {
  // GET /users/login
  // renders login page
  usersRoutes.get("/login", function(req, res) {
    let templateVars = {
      cookie: req.session
    };

    res.render("login", templateVars);
  });

  //GET /users/register
  // renders register page
  usersRoutes.get("/register", function(req, res) {
    let templateVars = {
      cookie: req.session
    };

    res.render("register", templateVars);
  });

  // POST /users/login
  // handles user login, saves encrypted cookie if successful
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

  // POST /users/logout
  //handles user logout
  usersRoutes.post("/logout", function(req, res) {
    //deletes cookie
    req.session = null;

    res.redirect("../");
  });

  // POST /users/register
  //handles user registration, does not allow for duplicate handles
  usersRoutes.post("/register", function(req, res) {
    //checks if all input fields are present
    if (!req.body.handle || !req.body.password || !req.body.avatar) {
      res
        .status(400)
        .json({ error: "invalid request: no valid data in POST body" });
    } else {
      //searches through database to see if handle exists already
      DataHelpers.findUser(req.body.handle, function(err, user) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          //if user is found using registration email, return error
          if (user) {
            res.status(500).send({ error: "Handle already exists!" });
          } else {
            //creates user
            let user = {
              handle: req.body.handle,
              password: bcrypt.hashSync(req.body.password, 10),
              name: req.body.name,
              avatar: req.body.avatar
            };

            DataHelpers.createUser(user, err => {
              if (err) {
                res.status(500).json({ error: err.message });
              } else {
                req.session.user_id = user.handle;
                res.success = true;
                res.redirect("../");
              }
            });
          }
        }
      });
    }
  });

  return usersRoutes;
};
