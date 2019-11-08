require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// eslint-disable-next-line camelcase
const { auth_client_id, auth_client_secret, callback_url } = process.env;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(new GoogleStrategy({
    clientID: auth_client_id,
    clientSecret: auth_client_secret,
    callbackURL: callback_url
  },
  (token, refreshToken, profile, done) => done(null, {
    profile,
    token
  })));
};
