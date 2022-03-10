import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Aircraft from './resolvers/Aircraft';
import Role from './resolvers/Role';
import aircraftApi from './api/aircraftAPI';
import roleApi from './api/roleAPI';

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Aircraft,
        Role
    },
    context: {
        aircraftApi,
        roleApi
    },
});

server.listen().then(({ url }) => {
    console.log("Server is ready at " + url);
});