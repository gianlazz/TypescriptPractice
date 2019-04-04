import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

//#region GraphQL
// Use cors for graphql
app.use(cors());

const schema = buildASTSchema(gql`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => "hello world"
};

app.use("/graphql", graphqlHTTP({ schema, rootValue}));

const graphqlPort = 4000;
app.listen(graphqlPort);
console.log(`Running a GraphQL API server at http://localhost:${ graphqlPort }/graphql`);
//#endregion

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an enviroment variable
const port = process.env.SERVER_PORT;

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );

// Configure session auth
sessionAuth.register( app );

// Configure routes
routes.register( app );

// Create connection to database with TypeORM ormconfig.json
createConnection()
    .then((connection) => {
        // Here you can start working with your entities
        // tslint:disable-next-line:no-console
        console.log("Connected to database with TypeORM.");
    })
    .catch((error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
    });

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
