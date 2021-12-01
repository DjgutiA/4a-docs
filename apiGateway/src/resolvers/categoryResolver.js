const categoryResolver = {
    Query: {
        listCategory: (_, __, { dataSources }) => {
            return dataSources.carAPI.listCategory();
        }
    },
    Mutation: {}
};
module.exports = categoryResolver;