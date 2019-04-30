import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { GuitarResolver } from "./resolvers/guitarResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { PersonImageResolver } from "./resolvers/personImageResolver";
import { PersonsFaceResolver } from "./resolvers/personsFaceResolver";
import Container from "typedi";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          GuitarResolver,
          PersonsFaceResolver,
          PersonImageResolver,
        ],
        container: Container
      });
};
