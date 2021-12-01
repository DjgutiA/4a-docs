const cityResolver = {
    Query: {
        listCity: (_, __, { dataSources }) => {
            return dataSources.carAPI.listCity();
        }
    },
    Mutation: {}
};
module.exports = cityResolver;