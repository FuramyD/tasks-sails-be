const _ = require("lodash");

module.exports = {


    friendlyName: "Register",


    description: "Register users.",


    inputs: {
        username: { type: "string", maxLength: 256, unique: true, required: true, allowNull: false },
        email: { type: "string", maxLength: 256, required: true, unique: true, allowNull: false },
        password: { type: "string", maxLength: 16, minLength: 6, required: true, allowNull: false },
    },


    exits: {
        success: {
            statusCode: 201,
        }
    },


    fn: async function (user) {
        return await User.create(user).fetch();
    }


};
