const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
// const key = require("../Setup/url").secret;

router.post("/register", async (req, res) => {
  const { email, password, usertype } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.json({ success: false, message: "user already exists" });
  } else {
    let newUser = new User({
      username,
      email,
      password,
      description,
      usertype,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save().catch((err) => console.log(err));
      });
    });
    return res.json({
      success: true,
      message: "user registered",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, errMessage: "no user fund" });
  } else {
    var payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      type: user.usertype,
    };

    bcrypt
      .compare(password, user.password)
      .then((isCorrect) => {
        if (!isCorrect)
          return res.json({
            success: false,
            errMessage: "wrong password",
          });
        else {
          jsonwt.sign(
            payload,
            "somekey",
            { expiresIn: 9000000 },
            (err, token) => {
              return res.json({ success: true, token: token });
            }
          );
        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
