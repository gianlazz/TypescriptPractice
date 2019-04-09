import cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

// Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
app.use(cors());
// Manual CORS Headers
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
//     if ("OPTIONS" === req.method) {
//         res.sendStatus(200);
//     } else {
//         console.log(`${req.ip} ${req.method} ${req.url}`);
//     }
// });

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
// Registers the /routes/index.ts which registers subsequent express .ts files
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
    console.log( `Server started at http://localhost:${ port }` );
    console.log(`Running a GraphQL API server at http://localhost:${ port }/graphql`);
} );