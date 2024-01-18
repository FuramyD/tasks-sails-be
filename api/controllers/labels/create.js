const _ = require("lodash");
module.exports = {


    friendlyName: "Create",


    description: "Create labels.",


    inputs: {
        ..._.omit(Label.attributes, ["id", "createdDate", "updatedDate"]),
    },


    exits: {
        success: {
            statusCode: 201,
        }
    },


    fn: async function (inputs, exits) {

        const label = await Label.create({
            ...inputs,
        }).fetch();

        // All done.
        return exits.success(label);

    }


};
