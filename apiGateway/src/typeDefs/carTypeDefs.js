const { gql } = require('apollo-server');
const carTypeDefs = gql`

    type Car {
        idCar: Int!
        licencePlate: String!
        pasangers: Int!
        transmission: Transmission!
        airConditioning: Boolean!
        suitcase: Suitcase!
        category: Category!
        city: City!
        price: Int!
        brand: String!
        model: String!
    }

    type CarInput {
        licencePlate: String!
        pasangers: Int!
        transmission: Transmission!
        airConditioning: Boolean!
        suitcase: Suitcase!
        category: Int!
        city: Int!
        price: Int!
        brand: String!
        model: String!
    }

    type Response {
        response: String!
    }

    type CarFilter {
        pasangers: Int
        transmission: Transmission
        airConditioning: Boolean
        suitcase: Suitcase
        category: Int
        city: Int
        brand: String
        model: String
        priceLte: Int
        priceGte: Int
    }

    enum Transmission {
        A: 'Automatic',
        M: 'Mechanical'
    }

    enum Suitcase {
        S: 'Small',
        M: 'Medium',
        B: 'Big'
    }

    type Brands {
        brands: [String]!
    }

    type Models {
        models: [String]!
    }
    

    extend type Query {
        filterCar(carFilter: CarFilter!) [Car]
        listCar() [Car]
        getCar(licencePlate: String!) Car
        listBrands() Brands
        listModel() Models
    }
    extend type Mutation {
        createCar(car: Car!): Car
        updateCar(car: CarInput) Car
        deleteCar(idCar: int!) Response
    }

`;
module.exports = carTypeDefs;