import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import { async } from "q";
import { Guitar } from "../../dal/entity/guitar";
import { PersonsFace } from "../../dal/entity/personsFace";
import { json } from "body-parser";

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

        type PersonsFace {
            id: Int
            name: String
            image: String
            jsonDescriptor: String
        }

        type Query {
            guitars: [Guitar]
            recognizedFaces: [PersonsFace]
            hello: String
        }

        type Mutation {
            createGuitar(userId: String!, brand: String!, model: String!, year: Int, color: String): Guitar
            deleteGuitar(id: Int!): Boolean
            registerPersonsFace(name: String, image: String, jsonDescriptor): PersonsFace
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
        hello: () => "hello world",
        recognizedFaces: async () => {
            const results = await PersonsFace.find();
            console.log(results);
            return results;
        },
        registerPersonsFace: async (name: string, image: string, jsonDescriptor: string) => {
            let personsFace = new PersonsFace();
            personsFace.name = name;
            personsFace.image = image;
            personsFace.jsonDescriptor = jsonDescriptor;
            personsFace = await PersonsFace.create(personsFace);
            personsFace.save();
            return personsFace;
        },
    };

    app.use("/graphql", graphqlHTTP({ schema, rootValue}));
};
