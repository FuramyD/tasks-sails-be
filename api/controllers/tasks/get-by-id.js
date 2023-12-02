module.exports = {


    friendlyName: "Get by id",


    description: "",


    inputs: {
        id: { type: "number", required: true }
    },


    exits: {
        success: {
            statusCode: 200,
        },
        notFound: {
            description: "No task with the specified ID was found in the database.",
            responseType: "json"
        },
    },


    fn: async function ({ id }, exits) {

        // All done.
        const task = await Task.updateOne({ id }).set();

        console.log({ task });

        if (!task) {
            return exits.notFound({
                "error": `User with id: ${id} not found`
            });
        }

        return exits.success(task);
    }


};
