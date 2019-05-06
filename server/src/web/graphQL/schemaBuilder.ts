import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { GuitarResolver } from "./resolvers/guitarResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { PersonImageResolver } from "./resolvers/personImageResolver";
import { PersonsFaceResolver } from "./resolvers/personsFaceResolver";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { customAuthChecker } from "./customAuthChecker";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          GuitarResolver,
          PersonsFaceResolver,
          PersonImageResolver,
          AuthenticationResolver
        ],
        container: Container,
        authChecker: customAuthChecker
      });
};
