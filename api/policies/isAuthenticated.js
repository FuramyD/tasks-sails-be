const passport = require("passport");

module.exports = async (req, res, proceed) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        console.log({ err, user, info });
        if (err) {
            res.status(401).send(err);
        }
        if (user) {
            req.user = user;
            return proceed();
        }
        if (info) {
            return res.status(403).send(info);
        }
        // Otherwise, this request did not come from a logged-in user.
        return res.status(403).send({ error: "You are not permitted to perform this action." });
    })(req, res, proceed);
};

