import { ApolloServer } from "apollo-server-express";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import { async } from "q";
import { buildSchema, Query, Resolver } from "type-graphql";
import { Guitar } from "../../dal/entity/guitar";
import { Image } from "../../dal/entity/image";
import { Person } from "../../dal/entity/person";
import { PersonImage } from "../../dal/entity/personImage";
import { PersonsFace } from "../../dal/entity/personsFace";
import { GuitarResolver } from "../resolvers/guitarResolver";
import { HelloResolver } from "../resolvers/helloResolver";
import { PersonsFaceResolver } from "../resolvers/personsFaceResolver";

export const register = async ( app: express.Application ) => {

    // Authorization
    const oidc = app.locals.oidc;

    const schema = await buildSchema({
        resolvers: [HelloResolver, GuitarResolver, PersonsFaceResolver],
      });

    const apolloServer = new ApolloServer({schema});

    apolloServer.applyMiddleware({ app });

    const ASTSschema = buildASTSchema(gql`
        # type Guitar {
        #     id: ID
        #     userId: String
        #     brand: String
        #     model: String
        #     year: Int
        #     color: String
        # }

        type Person {
            id: ID
            name: String
            firstSeenDateTime: String
            images: [Image]
        }

        input InputPerson {
            id: ID
            name: String
            firstSeenDateTime: String
            images: [InputImage]
        }

        type Image {
            id: ID
            image: String
            persons: [Person]
        }

        input InputImage {
            id: ID
            image: String
            persons: [InputPerson]
        }

        type PersonDescriptor {
            id: ID
            descriptor: [Float]
            person: Person
            image: Image
        }

        type PersonImage {
            personId: ID
            imageId: ID
            personDescriptorId: ID
            person: Person
            image: Image
            personDescriptor: PersonDescriptor
        }

        # type PersonsFace {
        #     id: ID
        #     # For creating labeled descriptors for rendering matches
        #     name: String
        #     # Base64 encoded image string used to generate the descriptor
        #     image: String
        #     # Float array representation of the face coordinates for matching
        #     descriptor: [Float]
        # }

        type Query {
            getAllPersonsImages(personId: ID!): [Image]
            # guitars: [Guitar]
            # recognizedFaces: [PersonsFace]
            # hello: String
        }

        type Mutation {
            # createGuitar(userId: String!, brand: String!, model: String!, year: Int, color: String): Guitar
            # deleteGuitar(id: ID!): Boolean
            # registerPersonsFace(name: String, image: String, descriptor: [Float]): Int
            newPerson(newPerson: InputPerson): Int
        }
    `);

    const rootValue = {
        // createGuitar: async (guitar: Guitar): Promise<Guitar> => {
        //     try {
        //         guitar = await Guitar.create(guitar);
        //         guitar = await guitar.save();
        //         return guitar;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // deleteGuitar: async (id: number): Promise<boolean> => {
        //     try {
        //         Guitar.delete(id);
        //         return true;
        //     } catch (error) {
        //         console.error(error);
        //         return false;
        //     }
        // },
        getAllPersonsImages: async (personId: number): Promise<Image[]> => {
            try {
                const personImages = await PersonImage.find({personId});
                const result: Image[] = [];
                personImages.forEach((x) => {
                    result.push(x.image);
                });
                return result;
            } catch (error) {
                console.error(error);
                throw(error);
            }
        },
        // // guitars: async (userId: string) => {
        // guitars: async (): Promise<Guitar[]> => {
        //     try {
        //         //  const guitars = await Guitar.find({ userId });
        //         const guitars = await Guitar.find();
        //         console.log(guitars);
        //         return guitars;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // hello: () => "hello world",
        newPerson: async (newPerson: Person): Promise<number> => {
            try {
                newPerson = await Person.create(newPerson);
                newPerson = await newPerson.save();
                return newPerson.id;
            } catch (error) {
                console.error(error);
                throw(error);
            }
        },
        // recognizedFaces: async (): Promise<PersonsFace[]> => {
        //     try {
        //         const results = await PersonsFace.find();
        //         console.log(results);
        //         return results;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // registerPersonsFace: async (personsFace: PersonsFace): Promise<number> => {
        //     try {
        //         console.log("registerPersonsFace mutation hit");
        //         personsFace = await PersonsFace.create(personsFace);
        //         personsFace = await personsFace.save();
        //         console.log(`registerPersonsFace mutation finished ${personsFace.id}`);
        //         return personsFace.id;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
    };

    // app.use("/graphql", graphqlHTTP({ schema: ASTSschema, rootValue}));
};
