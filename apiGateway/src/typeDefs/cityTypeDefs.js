const { gql } = require('apollo-server');
const cityTypeDefs = gql`
    type City {
        id_city: Int!
        name_city: String!
    }

    extend type Query {
        listCity(idUser: Int!): [City]
    }

`;
module.exports = cityTypeDefs;