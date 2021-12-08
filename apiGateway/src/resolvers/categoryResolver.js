const categoryResolver = {
    Query: {
        listCategory: (_, { idUser }, { dataSources, userIdToken },) => {
            if (idUser == userIdToken)
                return dataSources.carAPI.listCategory();
            else
                null
        }
    },
    Mutation: {}
};
module.exports = categoryResolver;