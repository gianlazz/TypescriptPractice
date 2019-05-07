import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { configuredSchema } from "../web/graphQL/schemaBuilder";
import { IMyContext } from "../web/graphQL/context.interface";

interface IOptions {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    contextValue?: any
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, contextValue }: IOptions) => {
    // Check if schema already exists
    if (!schema) {
        schema = await configuredSchema();
    }

    return graphql({
        schema,
        source,
        variableValues,
        contextValue: contextValue
    });
};
