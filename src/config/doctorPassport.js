const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the doctor model
const Doctor = require('../models/doctorModel');
const settings = require('../config/settings');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Doctor.findOne({id: jwt_payload.id}, (err, user) => {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
