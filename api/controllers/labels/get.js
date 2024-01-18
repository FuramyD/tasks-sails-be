module.exports = {


    friendlyName: "Get",


    description: "Get labels.",


    inputs: {
        search: { type: "string", allowNull: false },
    },


    exits: {
        success: {
            statusCode: 200,
        }
    },


    fn: async function ({ search }, exits) {

        const labels = await Label.find({
            where: {
                name: { contains: search || "" }
            }
        });

        // All done.
        return exits.success(labels);

    }


};
