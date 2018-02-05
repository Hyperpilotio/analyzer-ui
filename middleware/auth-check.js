import jwt from "jsonwebtoken";
import config from "../config";
// const User = require('mongoose').model('User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(" ")[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists

    if (userId !== 1) {
      return res.status(401).end();
    }

    return next();


    // return User.findById(userId, (userErr, user) => {
    //   if (userErr || !user) {
    //     return res.status(401).end();
    //   }

    //   return next();
    // });
  });
};
