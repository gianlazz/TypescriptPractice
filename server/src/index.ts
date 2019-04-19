import cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import * as http from "http";
import path from "path";
import { Pool } from 'pg';
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as sessionAuth from "./web/middleware/sessionAuth";
import * as routes from "./web/routes";

const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

// Configure Express to allow Cross Origin Scripting so server and client can communicate during dev
app.use(cors());

// initialize configuration
if (process.env.DEPLOYMENT === "Heroku") {
// Environment variables set in heroku
} else {
    dotenv.config();
}

// port is now available to the Node.js runtime
// as if it were an enviroment variable
const port = process.env.PORT;

// // Configure Express to serve static files in the public folder
// app.use( express.static( path.join( __dirname, "public" ) ) );

// Configure Express to serve bundled angular client
app.use(express.static( path.join( __dirname + "/web/AngularFrontEnd" ) ) );
// app.use("/*", ( req, res ) => res.sendFile( path.join( __dirname + "/web/AngularFrontEnd/index.js" ) ) );

// Configure Express to serve static files in the models folder for face-api.js
app.use("/models", express.static( path.join( __dirname, "/web/models" ) ) );

// Configure session auth
sessionAuth.register( app );

// Configure routes
// Registers the /routes/index.ts which registers subsequent express .ts files
routes.register( app );

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.get("/db", async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      const results = { results: (result) ? result.rows : null};
      res.render("pages/db", results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

// Create connection to database with TypeORM ormconfig.json
createConnection({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [
        "dist/dal/entity/**/*.js"
    ],
    synchronize: true,
    extra: {
         ssl: true,
    }
}).then((connection) => {
        // Here you can start working with your entities
        // tslint:disable-next-line:no-console
        console.log("Connected to database with TypeORM.");
    })
    .catch((error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
    });

// const server = http.createServer(app);
// server.listen(port, () => console.log("Running..."));

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `Server started at http://localhost:${ port }` );
    console.log(`Running a GraphQL API server at http://localhost:${ port }/graphql`);
 } );
