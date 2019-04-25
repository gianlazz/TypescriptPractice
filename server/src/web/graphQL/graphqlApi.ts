import { ApolloServer } from "apollo-server-express";
import express from "express";
import { configuredSchema } from "./schemaBuilder";

export const register = async ( app: express.Application ) => {

    // Authorization
    const oidc = app.locals.oidc;

    const schema = await configuredSchema();

    const apolloServer = new ApolloServer({schema});

    apolloServer.applyMiddleware({ app });
};
