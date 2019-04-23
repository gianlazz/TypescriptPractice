import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { GuitarResolver } from "../resolvers/guitarResolver";
import { HelloResolver } from "../resolvers/helloResolver";
import { PersonResolver } from "../resolvers/personResolver";
import { PersonsFaceResolver } from "../resolvers/personsFaceResolver";

export const register = async ( app: express.Application ) => {

    // Authorization
    const oidc = app.locals.oidc;

    const schema = await buildSchema({
        resolvers: [HelloResolver, GuitarResolver, PersonsFaceResolver, PersonResolver],
      });

    const apolloServer = new ApolloServer({schema});

    apolloServer.applyMiddleware({ app });
};
