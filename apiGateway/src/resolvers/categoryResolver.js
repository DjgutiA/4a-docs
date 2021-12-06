const categoryResolver = {
    Query: {
        listCategory: (_, { id_user }, { dataSources, userIdToken },) => {
            if (id_user == userIdToken)
                return dataSources.carAPI.listCategory();
            else
                null
        }
    },
    Mutation: {}
};
module.exports = categoryResolver;