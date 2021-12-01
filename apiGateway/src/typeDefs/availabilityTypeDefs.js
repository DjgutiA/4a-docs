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
        filterCarAvailability(availabilityFilter: AvailabilityFilter): [Car]
        filterForCar(id_car: Int!): [Availability]
        listAvailability: [Availability]
    }
    extend type Mutation {
        createAvailability(availabilityInput: AvailabilityInput!): [Availability]
        updateAvailability(availabilityInput: AvailabilityInput!): Response
    }
`;
module.exports = availabilityTypeDefs;