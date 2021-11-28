const { gql } = require('apollo-server');
const categoryTypeDefs = gql`
    type Category {
        idCategory: Int!
        nameCategory: String!
    }

    extend type Query {
        listCategory() [Category]
    }
`;
module.exports = categoryTypeDefs;