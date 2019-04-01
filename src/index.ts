import dotenv from "dotenv";
import express from "express";
import path from "path";
import "reflect-metadata";
const app = express();
import { createConnection } from "typeorm";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

// Configure Express to parse incoming JSON data
app.use( express.json() );

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
