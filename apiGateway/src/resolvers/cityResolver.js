const cityResolver = {
    Query: {
        listCity: (_, { id_user }, { dataSources, userIdToken },) => {
            if (id_user == userIdToken)
                return dataSources.carAPI.listCity();
            else
                return null;
        }
    },
    Mutation: {}
};
module.exports = cityResolver;