import { useContainer } from "class-validator";
import cookieParser = require("cookie-parser");
import cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { createConnection } from "typeorm";
import { createLocalDevDbConnection } from "./deploymentConfigs/createLocalDevDbConnection";
import { createHerokuDbConnection } from "./deploymentConfigs/herokuDeployment";
import * as graphqlApi from "./web/graphQL/graphqlApi";
import * as sessionAuth from "./web/middleware/sessionAuth";

useContainer(Container);

const app = express();
// Configure Express to parse incoming JSON data
app.use( express.json() );

app.use(cookieParser());

// Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
app.use(cors());

// initialize configuration
if (process.env.DEPLOYMENT === "Heroku") {
// Typeorm connection
    createHerokuDbConnection()
    .then((connection) => console.log("Connected to heroku Postgres with TypeORM."))
    .catch((error) => console.log(error));
} else {
    dotenv.config();
// Typeorm connection
    createLocalDevDbConnection()
    .then((connection) => console.log("Connected to default ormconfig.json database with TypeORM."))
    .catch((error) => console.log(error));
}

// port is now available to the Node.js runtime
// as if it were an enviroment variable
const port = process.env.PORT;

// Configure Express to serve bundled angular client
app.use(express.static( path.join( __dirname + "/web/AngularFrontEnd" ) ) );
// app.use("/*", ( req, res ) => res.sendFile( path.join( __dirname + "/web/AngularFrontEnd/index.js" ) ) );

// Configure Express to serve static files in the models folder for face-api.js
app.use("/models", express.static( path.join( __dirname, "/web/models" ) ) );

// Configure session auth middleware
// TS-NODE DEBUGGER THROWS ERROR ON THIS LINE
// sessionAuth.register( app );

// Register GraphQL setup middleware
graphqlApi.register( app );

// start the Express server
app.listen( port, () => {
    console.log( `Server started at http://localhost:${ port }` );
    console.log(`Running a GraphQL API server at http://localhost:${ port }/graphql`);
 } );
