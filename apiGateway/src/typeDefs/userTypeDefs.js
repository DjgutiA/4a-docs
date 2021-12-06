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
        first_name: String!
        last_name: String!
        document: String!
        password: String!
        email: String!
        birth_date: String!
        cellphone: String!
        gender: Gender!
    }
    type User {
        id_user: Int!
        first_name: String!
        last_name: String!
        document: String!
        password: String!
        email: String!
        birth_date: String!
        cellphone: String!
        gender: Gender!
        is_superuser: Boolean!
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