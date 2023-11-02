const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const options = require("./jwt-options");

module.exports = {
    passport: () => {
        passport.use(new JwtStrategy(options, (jwtPayload, done) => {
            User.findOne({ id: jwtPayload.id }, (err, user) => {
                if (err) {
                    return done(err, null);
                }
                if (user) {
                    return done(null, user);
                }
                return done({ message: "No user account found" }, "No user account found");
            });
        }));
    }
};
