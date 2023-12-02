const { generate: generateJwt } = require("../../auth/jwt");
const bcrypt = require("bcrypt-promise");
const options = require("../../strategies/jwt-options");

module.exports = {


    friendlyName: "Login",


    description: "Login users.",


    inputs: {
        email: { type: "string", maxLength: 256, required: true },
        password: { type: "string", minLength: 4, maxLength: 16, required: true },
    },


    exits: {
        serverError: {
            statusCode: 500,
        },
        invalidInput: {
            statusCode: 401,
        }
    },


    fn: async function ({ email, password }, exits) {
        const user = await User.findOne({ email });
        const compared = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !compared) {
            return exits.invalidInput({
                error: "Incorrect email or password, please check and try again"
            });
        }

        return exits.success({
            accessToken: generateJwt(user.id, user.email),
            expirationDate: options.jsonWebTokenOptions.expiresIn,
        });
    }
};
