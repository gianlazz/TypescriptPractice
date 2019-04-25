import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { configuredSchema } from "../web/graphQL/schemaBuilder";

interface IOptions {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: IOptions) => {
    // Check if schema already exists
    if (!schema) {
        schema = await configuredSchema();
    }

    return graphql({
        schema,
        source,
        variableValues
    });
};
