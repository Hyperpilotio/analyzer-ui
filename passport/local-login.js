import _ from "lodash";

const jwt = require("jsonwebtoken");
// const User = require("mongoose").model("User");
const PassportLocalStrategy = require("passport-local").Strategy;
const config = require("../config");

const users = [
  {
    username: "zack",
    password: "1234",
    _id: 1,
  },
  // node: {
  //   username: "node",
  //   password: "5678",
  //   _id: 2,
  // },
];


module.exports = new PassportLocalStrategy({
  usernameField: "username",
  passwordField: "password",
  session: false,
  passReqToCallback: true,
}, (req, username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim(),
  };

  console.log("userData", userData);

  // const user = users.filter(
  //   u => u.username === userData.username && u.password === userData.password);
  
  const matchUser = _.find(users, {
    username: userData.username,
    password: userData.password,
  });
  
  if (matchUser) {
    // 發行簽證
    const payload = {
      sub: matchUser._id,
    };

    // create a token string
    const token = jwt.sign(payload, config.jwtSecret);
    return done(null, token, matchUser);
  }
  return done(null, false);

  // find a user by email address
  // return User.findOne({ email: userData.email }, (err, user) => {
  //   if (err) { return done(err); }

  //   if (!user) {
  //     const error = new Error("Incorrect email or password");
  //     error.name = "IncorrectCredentialsError";

  //     return done(error);
  //   }

  //   // check if a hashed user"s password is equal to a value saved in the database
  //   return user.comparePassword(userData.password, (passwordErr, isMatch) => {
  //     if (err) { return done(err); }

  //     if (!isMatch) {
  //       const error = new Error("Incorrect email or password");
  //       error.name = "IncorrectCredentialsError";

  //       return done(error);
  //     }

  //     const payload = {
  //       sub: user._id,
  //     };

  //     // create a token string
  //     const token = jwt.sign(payload, config.jwtSecret);
  //     const data = {
  //       name: user.name,
  //     };

  //     return done(null, token, data);
  //   });
  // });
});
