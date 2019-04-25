import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { GuitarResolver } from "./resolvers/guitarResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { ImageResolver } from "./resolvers/imageResolver";
import { PersonResolver } from "./resolvers/personResolver";
import { PersonsFaceResolver } from "./resolvers/personsFaceResolver";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          GuitarResolver,
          PersonsFaceResolver,
          PersonResolver,
          ImageResolver
        ],
      });
};
