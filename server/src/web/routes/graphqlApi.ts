import { json } from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import { async } from "q";
import { Guitar } from "../../dal/entity/guitar";
import { PersonsFace } from "../../dal/entity/personsFace";

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
            # For creating labeled descriptors for rendering matches
            name: String
            # Base64 encoded image string used to generate the descriptor
            image: String
            # Float array representation of the face coordinates for matching
            descriptor: [Float]
        }

        type Query {
            guitars: [Guitar]
            recognizedFaces: [PersonsFace]
            hello: String
        }

        type Mutation {
            createGuitar(userId: String!, brand: String!, model: String!, year: Int, color: String): Guitar
            deleteGuitar(id: Int!): Boolean
            registerPersonsFace(PersonsFace): Int
        }
    `);

    const rootValue = {
        createGuitar: async (guitar: Guitar) => {
            try {
            guitar = await Guitar.create(guitar);
            guitar = await guitar.save();
            return guitar;
            } catch (error) {
                console.error(error);
            }

        },
        deleteGuitar: async (id: number) => {
            try {
                Guitar.delete(id);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        // guitars: async (userId: string) => {
        guitars: async () => {
            try {
            //  const guitars = await Guitar.find({ userId });
            const guitars = await Guitar.find();
            console.log(guitars);
            return guitars;
            } catch (error) {
                console.error(error);
            }
        },
        hello: () => "hello world",
        recognizedFaces: async () => {
            try {
            const results = await PersonsFace.find();
            console.log(results);
            return results;
            } catch (error) {
                console.error(error);
            }
        },
        registerPersonsFace: async (personsFace: PersonsFace) => {
            try {
                console.log("registerPersonsFace mutation hit");
                personsFace = await PersonsFace.create(personsFace);
                personsFace = await personsFace.save();
                console.log(`registerPersonsFace mutation finished ${personsFace.id}`);
                return personsFace.id;
            } catch (error) {
                console.error(error);
            }
        },
    };

    app.use("/graphql", graphqlHTTP({ schema, rootValue}));
};
