import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config";

const User = mongoose.model("User");

module.exports = (req, res, next) => {

  console.log("req.headers.authorization", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).redirect("/login");
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];
  console.log("token", token);
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).redirect("/login"); }
    
    console.log("decoded", decoded);
    const userId = decoded.sub;

    // check if a user exists

    if (userId !== 1) {
      return res.status(401).redirect("/login");
    }

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).redirect("/login");
      }

      req.user = user;
      return next();
    });
  });
};
