const { gql } = require('apollo-server');
const rentalTypeDefs = gql`
    type Rental {
        idRental: Int!
        idUser: Int!
        idCar: Int!
        rentalDate: String!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    type RentalInput {
        idUser: Int!
        idCar: Int!
        startDate: String!
        finalDate: String!
        price: Int!
    }

    extend type Query {
        listRentalForUser(idUser: Int!) [Rental]
        getRental(idRental: Int!) Rental
    }
    extend type Mutation {
        createRental(rentalInput: RentalInput!)
        updateRental(rentalInput: RentalInput!)
        deleteRental(idRental: Int!)
    }
`;
module.exports = rentalTypeDefs;