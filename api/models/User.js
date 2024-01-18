/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const _ = require("lodash");

module.exports = {

    tableName: "users",
    primaryKey: "id",

    attributes: {
        username: { type: "string", maxLength: 256, minLength: 4, unique: true, required: true, allowNull: false },
        email: { type: "string", maxLength: 256, required: true, unique: true, allowNull: false },
        password: { type: "string", maxLength: 16, minLength: 6, required: true, allowNull: false },
        teams: { collection: "team", via: "users" }

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

    beforeCreate(valuesToSet, proceed) {
        // Hash password
        sails.helpers.passwords.hashPassword.with({ password: valuesToSet.password }).exec((err, hashedPassword)=> {
            if (err) { return proceed(err); }
            valuesToSet.password = hashedPassword;
            return proceed();
        });
    },

    customToJSON() {
        return _.omit(this, ["password"]);
    }

};

