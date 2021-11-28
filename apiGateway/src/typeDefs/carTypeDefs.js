const { gql } = require('apollo-server');
const carTypeDefs = gql`
    type Car {
        id_car: Int!
        licence_plate: String!
        pasangers: Int!
        transmission: String!
        air_conditioning: Boolean!
    }

`;
module.exports = carTypeDefs;