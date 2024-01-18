const _ = require("lodash");

function omitOfEach(object, keys) {
    return Object.fromEntries(
        Object.entries(object).map(([k, obj]) => [k, _.omit(obj, keys)])
    );
}

module.exports = {


    friendlyName: "Update",


    description: "Update tasks.",


    inputs: {
        id: { type: "number", required: true },
        ..._.omit(omitOfEach(
            Task.attributes,
            ["required", "defaultsTo"]),
            ["id", "createdDate", "updatedDate", "assignee", "createdBy", "comments", "labels"]
        ),
        assignee: { type: "json" },
        comments: { type: "json" },
        labels: { type: "json" },
    },


    exits: {
        success: {
            statusCode: 200,
        },
        notFound: {
            statusCode: 404,
            description: "No task with the specified ID was found in the database.",
            responseType: "json"
        },
    },


    fn: async function ({ id, assignee, comments, labels, ...updatedAttributes }, exits) {
        const updatedTask = await Task.updateOne({ id }).set({
            ...updatedAttributes,
            ...assignee && { assignee: assignee.id },
            ...comments && { comments: comments.map(comment => comment.id) },
            ...labels && { labels: labels.map(label => label.id) },
        });

        if (updatedTask) {
            const task = await Task.findOne({ id }).populateAll();
            return exits.success(task);
        }

        return exits.notFound({
            error: {
                message: `No task with the specified ID was found in the database.`,
            }
        });
    }


};
