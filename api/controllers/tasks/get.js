module.exports = {


    friendlyName: "Get",


    description: "Get tasks.",


    inputs: {
        search: { type: "string", required: false },
    },


    exits: {
        success: {
            statusCode: 200,
        }
    },


    fn: async function ({ search }) {
        console.log({ search });
        return await Task.find({
            where: {
                title: { contains: search || "" }
            }
        });
    }


};
