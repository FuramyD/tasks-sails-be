// const Task = require("../../models/Task");

const _ = require("lodash");

module.exports = {
    friendlyName: "Create",
    description: "Create task.",

    inputs: {
        ..._.omit(Task.attributes, ["id", "createdDate", "updatedDate"]),
    },

    exits: {
        success: {
            statusCode: 201,
        }
    },


    fn: async function (inputs) {
        return await Task.create(inputs).fetch();
    }


};
