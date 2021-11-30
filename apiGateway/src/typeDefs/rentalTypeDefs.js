const { gql } = require('apollo-server');
const rentalTypeDefs = gql`
    type Rental {
        idRental: String!
        idUser: Int!
        idCar: Int!
        rentalDate: String!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    input RentalInput {
        idUser: Int!
        idCar: Int!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    input RentalUpdateInput {
        idRental: String!
        idUser: Int!
        idCar: Int!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    extend type Query {
        listRentalForUser(idUser: Int!): [Rental]
        listRentalForCar(idCar: Int!): [Rental]
        getRental(idRental: String!): Rental
    }
    extend type Mutation {
        createRental(rentalInput: RentalInput!): Rental
        updateRental(rentalUpdateInput: RentalUpdateInput!): Rental
        deleteRental(idRental: String!): Response
    }`;
module.exports = rentalTypeDefs;