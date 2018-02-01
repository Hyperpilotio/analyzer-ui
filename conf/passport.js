const LocalStrategy = require("passport-local").Strategy;

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

const withStrategy = (passport) => {
  passport.use("local", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
  }, (username, password, done) => {
    const user = users[username];

    if (user == null) {
      return done(null, false, { message: "Invalid user" });
    }

    if (user.password !== password) {
      return done(null, false, { message: "Invalid password" });
    }

    process.nextTick(() => done(null, user));
  },
  ));
};

export default withStrategy;
