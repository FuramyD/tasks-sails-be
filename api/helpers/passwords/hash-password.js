const bcrypt = require("bcrypt-promise");

module.exports = {


    friendlyName: "Hash password",


    description: "",


    inputs: {
        password: { type: "string", required: true, minLength: 4, maxLength: 16 }
    },


    exits: {
        success: {
            description: "All done.",
        },

    },


    fn: async function ({ password }) {
        return await bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));
    }


};

