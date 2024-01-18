const jwt = require("jsonwebtoken");
const options = require("../../../tickets-management/api/strategies/jwt-options");

module.exports = {
    generate: (id, email) => jwt.sign({ id, email }, options.secretOrKey, {
        audience: options.audience,
        expiresIn: options.jsonWebTokenOptions.expiresIn,
        issuer: options.issuer,
    })
};
