const userResolver = {
    Query: {
        userDetailById: (_, { userId }, { dataSources, userIdToken }) => {
            if (userId == userIdToken)
                return dataSources.userAPI.userDetailById(userId)
            else
                return null

        }
    },
    Mutation: {
        signUpUser: (_, { userInput }, { dataSources }) => {
            return dataSources.userAPI.signUpUser(userInput);
        },
        logIn: (_, { credentials }, { dataSources }) =>
            dataSources.userAPI.logIn(credentials),
        refreshToken: (_, { refresh }, { dataSources }) =>
            dataSources.userAPI.refreshToken(refresh),
    }
};
module.exports = userResolver;