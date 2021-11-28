const { gql } = require('apollo-server');
const availabilityTypeDefs = gql`
    type Availability {
        idAvailability: Int!
        car: Int!
        date: String!
        isAvailability: Boolean!
        created: String!
        modified: String!
    }

    type AvailabilityInput {
        car: Int!
        startDate: String!
        endDate: String!
        isAvailability: Boolean!
    }

    type AvailabilityFilter {
        car: [Int]
        startDate: String!
        endDate: String!
    }

    extend type Query {
        filterCarAvailability(availabilityFilter: AvailabilityFilter) [Car]
        filterForCar(idCar: Int!) [Availability]
        listAvailability() [Availability]
    }
    extend type Mutation {
        createAvailability(availabilityInput: AvailabilityInput!) Availability
        updateAvailability(availabilityInput: AvailabilityInput!) Response
    }
`;
module.exports = availabilityTypeDefs;