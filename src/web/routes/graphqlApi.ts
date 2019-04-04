import cors = require("cors");
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";

export const register = ( app: express.Application ) => {
    app.use(cors());

    const schema = buildASTSchema(gql`
        type Query {
            hello: String
        }

        type Guitar {
            id: Int!
            userId: String!
            brand: String!
            model: String!
            year: Int
            color: String
        }

        type Mutation {
            createGuitar(userId: String!, brand: String!, model: String!, year: Int, color: String): Guitar!
            deleteGuitar(id: Int!): Boolean
        }
    `);

    const rootValue = {
        hello: () => "hello world"
    };

    app.use("/graphql", graphqlHTTP({ schema, rootValue}));

    const graphqlPort = 4000;
    app.listen(graphqlPort);
    console.log(`Running a GraphQL API server at http://localhost:${ graphqlPort }/graphql`);
};
