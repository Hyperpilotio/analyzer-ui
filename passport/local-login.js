import jwt from "jsonwebtoken";
import PassportLocal from "passport-local";
import config from "../config";
import User from "../models/user";

const PassportLocalStrategy = PassportLocal.Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: "email",
  passwordField: "password",
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error("Incorrect email or password");
      error.name = "IncorrectCredentialsError";

      return done(null);
    }

    const payload = {
      sub: user._id,
    };

    // create a token string
    const token = jwt.sign(payload, config.jwtSecret);
    const data = {
      name: user.email,
      orgId: user.orgId,
    };

    return done(null, token, data);
  });
});
