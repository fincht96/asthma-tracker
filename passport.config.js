const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      console.log(user);
      if (user == null) {
        return done(null, false, {
          message: "No user with that email, try again",
        });
      }

      if (await bcrypt.compare(password, user._password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect, try again" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    console.log(id);

    getUserById(id)
      .then((res) => done(null, res))
      .catch((e) => done(e, null));

    // return done(null, getUserById(id));
  });
}

module.exports = initialize;
