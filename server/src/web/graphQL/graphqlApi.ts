import { ApolloServer } from "apollo-server-express";
import express from "express";
import { configuredSchema } from "./schemaBuilder";
import * as jwt from "express-jwt";

export const register = async ( app: express.Application ) => {

    // Authorization
    const oidc = app.locals.oidc;

    const schema = await configuredSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => {
            const context = {
              req,
              user: req.user, // `req.user` comes from `express-jwt`
            };
            return context;
          },
    });

    apolloServer.applyMiddleware({ app });
};
