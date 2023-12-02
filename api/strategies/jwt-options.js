const { ExtractJwt } = require("passport-jwt");

module.exports = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    jsonWebTokenOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
};
