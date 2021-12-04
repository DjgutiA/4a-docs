const { gql } = require('apollo-server');
const carTypeDefs = gql`

    type Car {
        id_car: Int!
        license_plate: String!
        passengers: Int!
        transmission: Transmission!
        air_conditioning: Boolean!
        suitcase: Suitcase!
        category_id: Category!
        city_id: City!
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
        price__lte: Int
        price__gte: Int
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
        filterCar(carFilter: CarFilter!, idUser: Int!): [Car]
        listCar(idUser: Int!): [Car]
        getCar(license_plate: String!, idUser: Int!): Car
        listBrands(idUser: Int!): Brands
        listModel(brand: String!, idUser: Int!): Models
    }
    extend type Mutation {
        createCar(carInput: CarInput!, idUser: Int!): Response
        updateCar(id_car: Int!, carInput: CarInput!, idUser: Int!): Car
        deleteCar(id_car: Int!, idUser: Int!): Response
    }

`;
module.exports = carTypeDefs;