/**
 * Tasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: "tasks",
    primaryKey: "id",

    attributes: {
        title: { type: "string", columnType: "citext", maxLength: 256, required: true, allowNull: false },
        description: { type: "string", maxLength: 1024, defaultsTo: "" },
        dueDate: { type: "ref", columnName: "due_date", columnType: "timestamptz" },
        completed: { type: "boolean", defaultsTo: false, allowNull: false },
        userId: { type: "number", columnName: "user_id" },
        difficulty: { type: "number", defaultsTo: 1, allowNull: false, max: 3 },
        assignee: { model: "user" },
        createdBy: { model: "user" },
        comments: { collection: "comment", via: "task" },
        labels: { collection: "label" },


        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};

