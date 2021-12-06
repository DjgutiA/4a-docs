const { gql } = require('apollo-server');
const rentalTypeDefs = gql`
    type Rental {
        id: String!
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
        id: String!
        idUser: Int!
        idCar: Int!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    extend type Query {
        listRentalByUser(idUser: Int!): [Rental]
        listRentalByCar(idCar: Int!, idUser: Int!): [Rental]
        getRental(idRental: String!, idUser: Int!): Rental
    }
    extend type Mutation {
        createRental(rentalInput: RentalInput!): Rental
        updateRental(rentalUpdateInput: RentalUpdateInput!): Rental
        deleteRental(idRental: String!, idUser: Int!): Response
    }`;
module.exports = rentalTypeDefs;