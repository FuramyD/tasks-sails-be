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
        },
        conflict: {
            statusCode: 409,
        },
        unknown: {
            statusCode: 500,
        }
    },


    fn: async function (user, exits) {
        const isUserAlreadyExists = Boolean(await User.findOne({ email: user.email }) || await User.findOne({ username: user.username }));

        if (isUserAlreadyExists) {
            return exits.conflict({
                error: {
                    message: "Username or email already exists, please login or try again with a different data."
                }
            });
        }

        const createdUser = await User.create(user).fetch();

        if (createdUser) {
            return exits.success(createdUser);
        }

        return exits.unknown({
            error: {
                message: "Something went wrong, please try again."
            }
        });
    }


};
