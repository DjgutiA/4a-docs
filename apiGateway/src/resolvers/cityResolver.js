const cityResolver = {
    Query: {
        listCity: (_, { idUser }, { dataSources, userIdToken },) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listCity();
            else
                return null;
        }
    },
    Mutation: {}
};
module.exports = cityResolver;