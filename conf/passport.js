import _ from "lodash";
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const users = {
  zack: {
    username: "zack",
    password: "1234",
    id: 1,
  },
  node: {
    username: "node",
    password: "5678",
    id: 2,
  },
};

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "HyperPilot";

// const withJWTStrategy = (passport) => {
//   passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
//     console.log("payload received", jwtPayload);
//     // usually this would be a database call:
    
//     const user = users[_.findIndex(users, { id: jwtPayload.id })];
    
//     if (user == null) {
//       return next(null, false, { message: "Invalid user" });
//     }

//     // if (user.password !== password) {
//     //   return next(null, false, { message: "Invalid password" });
//     // }

//     return next(null, user);
//   }));
// };


const withLocalStrategy = (passport) => {
  passport.use(new LocalStrategy((username, password, cb) => {
    const user = users.filter((u) => u.username === username && u.password === password);
    if (user.length === 1) {
      return cb(null, user[0]);
    }
    return cb(null, false);
  }));


  // passport.use(new LocalStrategy((username, password, done) => {

  //   const user = users[username];

  //   if (user == null) {
  //     return done(null, false, { message: "Invalid user" });
  //   }

  //   if (user.password !== password) {
  //     return done(null, false, { message: "Invalid password" });
  //   }

  //   process.nextTick(() => done(null, user));
  // },
  // ));
};

export default withLocalStrategy;
