const passport = require("passport");

module.exports = async (req, res, proceed) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        console.log({ err, user, info });
        if (err) {
            res.serverError(err, err.message);
        }
        if (user) {
            req.user = user;
            return proceed();
        }
        if (info) {
            return res.forbidden(info);
        }
        // Otherwise, this request did not come from a logged-in user.
        return res.forbidden();
    })(req, res, proceed);
};

