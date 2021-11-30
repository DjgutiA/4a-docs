const { gql } = require('apollo-server');
const userTypeDefs = gql`
    type Tokens {
        refresh: String!
        access: String!
    }
    type Access {
        access: String!
    }
    input CredentialsInput {
        document: String!
        password: String!
    }
    input SignUpInput {
        firstName: String!
        lastName: String!
        document: String!
        password: String!
        email: String!
        birthDate: String!
        cellphone: String!
        gender: Gender!
    }
    type User {
        id: Int!
        firstName: String!
        lastName: String!
        document: String!
        password: String!
        email: String!
        birthDate: String!
        cellphone: String!
        gender: Gender!
        isSuperUser: Boolean!
    }

    enum Gender {
        F
        M
    }

    type Mutation {
        signUpUser(userInput: SignUpInput!): Tokens!
        logIn(credentials: CredentialsInput!): Tokens!
        refreshToken(refresh: String!): Access!
    }
    type Query {
        userDetailById(userId: Int!): User!
    }`;
module.exports = userTypeDefs;