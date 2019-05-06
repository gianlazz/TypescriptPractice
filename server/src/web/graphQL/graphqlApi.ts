import { ApolloServer } from "apollo-server-express";
import express from "express";
import jwt from "express-jwt";
import { IMyContext } from "./context.interface";
import { configuredSchema } from "./schemaBuilder";

export const register = async ( app: express.Application ) => {

    // Authorization
    const oidc = app.locals.oidc;

    const schema = await configuredSchema();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res, user }: IMyContext): IMyContext => {
          const context = {
            req,
            res,
            // user: user, // `req.user` comes from `express-jwt`
          };
          return context as any;
        },
        // context: ({ req, res }: any) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });
};
