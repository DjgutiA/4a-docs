const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const UserAPI = require('./dataSources/userAPI');
const CarAPI = require('./dataSources/carAPI');
const RentalAPI = require('./dataSources/rentalAPI');
const authentication = require('./utils/authentication');

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI: new UserAPI(),
        carAPI: new CarAPI(),
        rentalAPI: new RentalAPI(),
    }),
    introspection: true,
    playground: true
});
server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});