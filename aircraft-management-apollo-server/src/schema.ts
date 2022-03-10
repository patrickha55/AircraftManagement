import { gql } from 'apollo-server';

const typeDefs = gql`
type Query {
    aircrafts: [Aircraft!]
    aircraft (id: Int!) : Aircraft

    roles: [Role]!
    role (id: Int!) : Role
}

type Mutation {
    createAircraft (aircraft: aircraftInput) : Aircraft!
    createRole (role: roleInput) : Role!

    updateAircraft (aircraft: aircraftInput) : Aircraft!
    updateRole (role: roleInput) : Role!

    deleteAircraft (id: Int!): Boolean!
    deleteRole (id: Int!): Boolean!
}

type Aircraft {
    id: Int!
    model: String!
    manufacturer: String!
    image: String!
    role: Role
    roleId: String!
}

type Role {
    id: Int!
    name: String!
    aircrafts: [Aircraft]
}

input roleInput {
    id: Int!
    name: String!
}

input aircraftInput {
    id: Int!
    manufacturer: String!
    model: String!
    image: String!
    roleId: Int!
}
`;

export default typeDefs;