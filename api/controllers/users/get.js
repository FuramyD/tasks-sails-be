module.exports = {


    friendlyName: "Get",


    description: "Get users.",


    inputs: {
        search: { type: "string" },
    },


    exits: {
        success: {
            statusCode: 200,
        }
    },


    fn: async function ({ search }, exits) {

        const users = await User.find({
            where: {
                or: [
                    {
                        username: { contains: search || "" }
                    },
                    {
                        email: { contains: search || "" }
                    }
                ]
            }
        });

        // All done.
        return exits.success(users);
    }


};
