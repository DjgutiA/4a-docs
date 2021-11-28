const { gql } = require('apollo-server');
const cityTypeDefs = gql`
    type City {
        idCity: Int!
        nameCity: String!
    }

    extend type Query {
        listCity() [City]
    }

`;
module.exports = cityTypeDefs;