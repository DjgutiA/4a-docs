const { gql } = require('apollo-server');
const categoryTypeDefs = gql`
    type Category {
        id_category: Int!
        name_category: String!
    }

    extend type Query {
        listCategory(idUser: Int!): [Category]
    }
`;
module.exports = categoryTypeDefs;