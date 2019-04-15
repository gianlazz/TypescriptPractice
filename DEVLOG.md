## Experimental Project To Investigate Typescript/NodeJS Tech Stack

## Table Of Contents

[General Learning Resources](#learning-resources)

Dev Notes ***Subjects in descending chronological order***

- [Angular And Express](#angular-and-express)
- [Angular](#angular)
- [Graphql](#graphql-setup)
- [TypeORM](#typeorm-setup)

## Learning resources:
---
- https://developer.okta.com/blog/2018/11/15/node-express-typescript
    - TS, NodeJS, Express w/ serverside rendered views using EJS
    - After serving SSR pages VUE is used for front end SPA
    - Contains useful modules for assisting ts dev
    - Authentication with okta service
    - Express based REST with postgresql dal for CRUD
- https://github.com/benawad/node-ts-graphql-boilerplate/tree/7_gql2ts

#### Debugging Resources:
- https://stackoverflow.com/questions/50361948/syntaxerror-unexpected-token-import-typeorm-entity
   - ormconfig.json entities should be .js because they'll be used post build.
- https://stackoverflow.com/questions/49990513/tslint-says-calls-to-console-log-are-not-allowed-how-do-i-allow-this
- https://stackoverflow.com/questions/34703398/launching-chrome-and-debugging-from-within-visual-studio-code
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_smart-stepping
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_restarting-debug-sessions-automatically-when-source-is-edited
- https://parceljs.org/module_resolution.html
- https://stackoverflow.com/questions/36172442/how-to-npm-start-at-a-different-directory
-https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History

#### TypeScript Language Features:
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://stackoverflow.com/questions/32906097/preprocessor-defines-in-typescript
- https://github.com/Microsoft/TypeScript/issues/4691#issuecomment-298653700

# Dev Notes (Ordered by oldest to most recent subject)

## Deploy With Zeit Now
---
**Now.json:**
- https://zeit.co/docs/v2/deployments/configuration
- https://zeit.co/docs/v2/deployments/builders/overview/
- https://zeit.co/examples/nodejs
- https://zeit.co/examples/apollo/

## Angular And Express
---
- [Stackoverflow about seperating express server and angular during dev with proxy and how to handle production](https://stackoverflow.com/questions/42895585/hooking-up-express-js-with-angular-cli-in-dev-environment)

- [Deploy Angular 6 app with Express (Youtube)](https://www.youtube.com/watch?v=sTbQphoYbK0)

- [🐉 A tool for managing JavaScript projects with multiple packages.](https://github.com/lerna/lerna)
    - [The highs and lows of using Lerna to manage your JavaScript projects](https://hackernoon.com/the-highs-and-lows-of-using-lerna-to-manage-your-javascript-projects-ff5c5cd82a99)

## Angular: 
---

**Organizing Repo With Angular Client & Express Backend:**
- https://www.google.com/search?q=nodejs+server+and+angular+in+same+repository&oq=nodejs+server+and+angular+in+same+repository&aqs=chrome..69i57.9328j0j7&sourceid=chrome&ie=UTF-8
- https://stackoverflow.com/questions/46212733/angular-2-and-node-js-project-structure
- https://medium.com/@stephenfluin/adding-a-node-typescript-backend-to-your-angular-app-29b0e9925ff

**Basic Angular Component Setup:**

Install Angular Material: https://material.angular.io/
```
ng add @angular/material
```

Generating general purpose Nav component:
```
ng generate @angular/material:material-nav --name=main-nav
```

- [Angular Material Introduction & Setup](https://www.youtube.com/watch?v=u679SQsfRVM)

- [Angular Material Responsive Navigation Tutorial](https://www.youtube.com/watch?v=Q6qhzG7mObU)

Generating a component & navigating to it:
- [Angular 4 Tutorial: Routing and Navigation Example](https://www.youtube.com/watch?v=YEashNLYRKY)

```
ng g component guitars
```

- [Angular Material Data Table Tutorial](https://www.youtube.com/watch?v=ao-nY-9biWs&list=PL55RiY5tL51p2R1L8sxaYlzmWh6yIrX8k&index=2)

```
ng generate @angular/material:material-table --name=data-table
```

- https://angular.io/guide/router

**Setting up Apollo GraphQL with Angular**

- [GraphQL with Apollo Server 2.0](https://www.youtube.com/watch?v=8D9XnnjFGMs)
- [Apollo Angular GraphQL Optimistic UI](https://www.youtube.com/watch?v=Wc7bJ2uv694)


## GraphQL Setup:

---
https://developer.okta.com/blog/2018/09/27/build-a-simple-api-service-with-express-and-graphql

Install the following packages:
```
npm install express-graphql @types/express-graphql graphql @types/graphql graphql-tag cors @types/cors
```

After that I added the following to the root index.ts
```Typescript
import graphqlHTTP from "express-graphql";
import { buildASTSchema } from "graphql";
import gql from "graphql-tag";
import path from "path";
```

```Typescript
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
```

Run with `npm run dev` then enter http://localhost:4000/graphql into this page: https://www.graphqlbin.com/v2/new

Enter and run the following in the graphql client:
```
query {
  hello
}
```

**GraphQL Client Setup:**

With Axios:
```Typescript
addGuitar() {
            const guitar = {
                brand: this.brand,
                color: this.color,
                model: this.model,
                year: this.year
            };
           
            axios({
                url: `http://localhost:8080/graphql`,
                method: 'post',
                data: {
                    query: `
                        mutation{
                            createGuitar(
                              userId: "1"
                              brand: "${ guitar.brand }"
                              model: "${ guitar.model }"
                              year: ${ guitar.year }
                              color: "${ guitar.color }"
                            ){
                              id
                              userId
                              brand
                              model
                              year
                              color
                            }
                          }
                    `
                }
            }).then((result) => {
                this.$refs.year.focus();
                this.brand = "";
                this.color = "";
                this.model = "";
                this.year = "";
                this.loadGuitars();
            })
            .catch( ( err: any ) => {
                // tslint:disable-next-line:no-console
                console.log( err );
            });
        }
```

Apollo-client:

Installling the preset package
```
npm install apollo-boost graphql-tag graphql --save
```


## TypeORM Setup:

---
- https://github.com/typeorm/typeorm
    - Evaluting TypeORM as a viable Typescript alternative to my Entity Framework experience
    - Objective: Transistion manual postgres dal from above tutorial to use TypeORM for data access/migrations
- [TypeORM Setup Youtube Playlist](https://www.youtube.com/playlist?list=PLN3n1USn4xlmlo0GtSjIeWGXe_Ndo9sYd)

**Initial Configuration w/ Postgres:**
```
npm install typeorm --save
npm install reflect-metadata --save
```
and import it somewhere in the global place of your app (for example in app.ts or index.ts):
```
import "reflect-metadata";
```
Then
```
npm install @types/node --save
npm install pg --save
```
Add the following to your tsconfig.json
```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```
Create the required folders & configuration files
```
touch ormconfig.json
cd src
mkdir entity
mkdir migration
```
Add the following example to the ormconfig.json.
Things to note about this config:
- Logging is set to true to log executed sql
- The host is pointing to an install of Postgres on your host maching
- The entities, migrations and subscribers point to the ts compiled js in dis/
- Synchronise is set to true so entity changes get executed against the db instantly **Do not use with production!** 
```Json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "test",
    "password": "Password123",
    "database": "test",
    "synchronize": true,
    "logging": true,
    "entities": [
       "dist/entity/**/*.js"
    ],
    "migrations": [
       "dist/migration/**/*.js"
    ],
    "subscribers": [
       "dist/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }
```
Adding entities based on the first learning resource tutorial for Guitar CRUD:
```
cd src/entity
touch guitar.ts
code guitar.ts
```
And paste in the following:

## TypeORM Entity
- Remember that all primitive types are nullable in javascript so the nullablility must be specified in the entity definition unlike entity framework for C# where int is not nullable but string is. ***This needs to be fact chacked with the TypeORM documentation.***
```Typescript
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Guitar extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public userId: string;

    @Column({ nullable: false })
    public brand: string;

    @Column({ nullable: false })
    public model: string;

    @Column({ nullable: true })
    public year: number;

    @Column({ nullable: true })
    public color: string;

}
```

 Roughly Equivalent SQL
 ---
 ```SQL
-- Drops guitars table
DROP TABLE IF EXISTS guitars;

-- Creates guitars table
CREATE TABLE IF NOT EXISTS guitars (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , brand varchar(50) NOT NULL
    , model varchar(50) NOT NULL
    , year smallint NULL 
    , color varchar(50) NULL
);
 ```

 Create the database connection in src/index.ts
 ```Typescript
import "reflect-metadata";
import {createConnection} from "typeorm";

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
```

Now you need to create the user: test with password: Password123. Then you have to create the database.

You should then be able to run `npm run dev`and see the generated sql logged out ending with `Connected to database with TypeORM.`

**Typeorm Cli:**
To see the list of Typeorm Cli commands run:
```
typeorm
```
For example, to drop all tables from the database you can run:
```
typeorm schema:drop
```

**Typeorm Migrations:**

[Typeorm Migration Generation Youtube Video](https://youtu.be/JfIvPDPUFo4?list=PLN3n1USn4xlmlo0GtSjIeWGXe_Ndo9sYd&t=328)

To generate a migration from changes to you entity run the following if you've installed typeorm globally:
```
typeorm migration:generate -n NameOfExampleMigration
```
Or run it from a local install:
```
npx ts-node ./node_modules/.bin/typeorm migration:generate -n NameOfExampleMigration
```

[Typeorm Applying Migration Youtube Video](https://youtu.be/JfIvPDPUFo4?list=PLN3n1USn4xlmlo0GtSjIeWGXe_Ndo9sYd&t=454)

To apply migrations to your database run the following if you've installed typeorm globally:
```
typeorm migration:run
```
Or run it from a local install:
```
npx ts-node ./node_modules/.bin/typeorm migration:run
```