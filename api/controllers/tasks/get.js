module.exports = {


    friendlyName: "Get",


    description: "Get tasks.",


    inputs: {

    },


    exits: {

    },


    fn: async function (inputs) {
        return await Task.find();
    }


};
