const { gql } = require('apollo-server');
const carTypeDefs = gql`

    type Car {
        id_car: Int!
        license_plate: String!
        passengers: Int!
        transmission: Transmission!
        air_conditioning: Boolean!
        suitcase: Suitcase!
        category: Category!
        city: City!
        price: Int!
        brand: String!
        model: String!
    }

    input CarInput {
        license_plate: String!
        passengers: Int!
        transmission: Transmission!
        air_conditioning: Boolean!
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

    input CarFilter {
        passengers: Int
        transmission: Transmission
        air_conditioning: Boolean
        suitcase: Suitcase
        category: Int
        city: Int
        brand: String
        model: String
        priceLte: Int
        priceGte: Int
    }

    enum Transmission {
        A
        M
    }

    enum Suitcase {
        S
        M
        B
    }

    type Brands {
        brands: [String]!
    }

    type Models {
        models: [String]!
    }
    

    extend type Query {
        filterCar(carFilter: CarFilter!): [Car]
        listCar: [Car]
        getCar(license_plate: String!): Car
        listBrands: Brands
        listModel(brand: String!): Models
    }
    extend type Mutation {
        createCar(carInput: CarInput!): Response
        updateCar(id_car: Int!, carInput: CarInput!): Car
        deleteCar(id_car: Int!): Response
    }

`;
module.exports = carTypeDefs;