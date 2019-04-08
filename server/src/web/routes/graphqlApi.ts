import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import { Guitar } from "../../dal/entity/guitar";

export const register = ( app: express.Application ) => {
    // Authorization
    const oidc = app.locals.oidc;

    const schema = buildASTSchema(gql`
        type Guitar {
            id: Int
            userId: String
            brand: String
            model: String
            year: Int
            color: String
        }

        type Query {
            guitars: [Guitar]
            hello: String
        }

        type Mutation {
            createGuitar(userId: String!, brand: String!, model: String!, year: Int, color: String): Guitar
            deleteGuitar(id: Int!): Boolean
        }
    `);

    const rootValue = {
        createGuitar: async (guitar: Guitar) => {
            guitar = await Guitar.create(guitar);
            guitar.save();
            return guitar;
        },
        deleteGuitar: async (id: number) => {
            try {
                Guitar.delete(id);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        // guitars: async (userId: string) => {
        guitars: async () => {
            //  const guitars = await Guitar.find({ userId });
            const guitars = await Guitar.find();
            console.log(guitars);
            return guitars;
        },
        hello: () => "hello world"
    };

    app.use("/graphql", graphqlHTTP({ schema, rootValue}));
};
