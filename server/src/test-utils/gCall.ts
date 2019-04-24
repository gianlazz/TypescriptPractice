import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { buildSchema } from "type-graphql";
import { GuitarResolver } from "../web/resolvers/guitarResolver";
import { HelloResolver } from "../web/resolvers/helloResolver";
import { PersonResolver } from "../web/resolvers/personResolver";
import { PersonsFaceResolver } from "../web/resolvers/personsFaceResolver";

interface IOptions {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

const createSchema = async () => {
    return await buildSchema({
        resolvers: [
            HelloResolver,
            GuitarResolver,
            PersonsFaceResolver,
            PersonResolver
        ]
    });
};

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: IOptions) => {
    // Check if schema already exists
    if (!schema) {
        schema = await createSchema();
    }

    return graphql({
        schema,
        source,
        variableValues
    });
};
