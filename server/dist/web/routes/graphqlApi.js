"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const guitar_1 = require("../../dal/entity/guitar");
exports.register = (app) => {
    // Authorization
    const oidc = app.locals.oidc;
    app.use(cors());
    const schema = graphql_1.buildASTSchema(graphql_tag_1.default `
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
        createGuitar: (guitar) => __awaiter(this, void 0, void 0, function* () {
            guitar = yield guitar_1.Guitar.create(guitar);
            guitar.save();
            return guitar;
        }),
        deleteGuitar: (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                guitar_1.Guitar.delete(id);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        // guitars: async (userId: string) => {
        guitars: () => __awaiter(this, void 0, void 0, function* () {
            //  const guitars = await Guitar.find({ userId });
            const guitars = yield guitar_1.Guitar.find();
            console.log(guitars);
            return guitars;
        }),
        hello: () => "hello world"
    };
    app.use("/graphql", express_graphql_1.default({ schema, rootValue }));
    const graphqlPort = 4000;
    app.listen(graphqlPort);
    console.log(`Running a GraphQL API server at http://localhost:${graphqlPort}/graphql`);
};
//# sourceMappingURL=graphqlApi.js.map