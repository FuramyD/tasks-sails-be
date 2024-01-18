// const Task = require("../../models/Task");

const _ = require("lodash");

module.exports = {
    friendlyName: "Create",
    description: "Create task.",

    inputs: {
        ..._.omit(Task.attributes, ["id", "createdDate", "updatedDate", "assignee", "createdBy", "comments", "label"]),
        assignee: { type: "json", required: true },
        labels: { type: "json" },
    },

    exits: {
        success: {
            statusCode: 201,
        }
    },


    fn: async function (inputs, exits) {
        const createdTask = await Task.create({
            ...inputs,
            assignee: inputs.assignee.id,
            createdBy: this.req.user.id,
            comments: [],
            labels: inputs.labels || []
        }).fetch();

        const task = await Task.findOne({ id: createdTask.id }).populateAll();

        return exits.success(task);
    }


};
