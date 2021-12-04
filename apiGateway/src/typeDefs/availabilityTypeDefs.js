const { gql } = require('apollo-server');
const availabilityTypeDefs = gql`
    type Availability {
        id_availability: Int!
        car: Int!
        date: String!
        is_availability: Boolean!
        created: String!
        modified: String!
    }

    input AvailabilityInput {
        car: Int!
        start_date: String!
        end_date: String!
        is_availability: Boolean!
    }

    input AvailabilityFilter {
        car: [Int]
        start_date: String!
        end_date: String!
    }

    extend type Query {
        filterCarAvailability(availabilityFilter: AvailabilityFilter, idUser: Int!): [Car]
        filterAvailabilityByCar(id_car: Int!, idUser: Int!): [Availability]
        listAvailability(idUser: Int): [Availability]
    }
    extend type Mutation {
        createAvailability(availabilityInput: AvailabilityInput!, idUser: Int): [Availability]
        updateAvailability(availabilityInput: AvailabilityInput!, idUser: Int): Response
    }
`;
module.exports = availabilityTypeDefs;