## Experimental Project To Investigate Typescript/NodeJS Tech Stack

## Table Of Contents

[General Learning Resources](#learning-resources)

Dev Notes ***Subjects in descending chronological order***

- [Testing Server](#testing-server)
- [VSCode Launch & Task Configuration](#vscode-launch-&-task-configuration)
- [Deployment](#deployment)
- [Serverless Deployment](#severless-deployment)
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
- https://stackoverflow.com/questions/31169259/how-to-debug-typescript-files-in-visual-studio-code
- https://stackoverflow.com/questions/50361948/syntaxerror-unexpected-token-import-typeorm-entity
   - ormconfig.json entities should be .js because they'll be used post build.
- https://stackoverflow.com/questions/49990513/tslint-says-calls-to-console-log-are-not-allowed-how-do-i-allow-this
- https://stackoverflow.com/questions/34703398/launching-chrome-and-debugging-from-within-visual-studio-code
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_smart-stepping
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_restarting-debug-sessions-automatically-when-source-is-edited
- https://parceljs.org/module_resolution.html
- https://stackoverflow.com/questions/36172442/how-to-npm-start-at-a-different-directory
- https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History
- https://stackoverflow.com/questions/4981126/how-to-amend-several-commits-in-git-to-change-author

#### TypeScript Language Features:
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://stackoverflow.com/questions/32906097/preprocessor-defines-in-typescript
- https://github.com/Microsoft/TypeScript/issues/4691#issuecomment-298653700

# Dev Notes (Ordered by oldest to most recent subject)

## Dependency Injection

- [(YouTube) Dependency Injection TypeGraphQL](https://www.youtube.com/watch?v=5YYsfkl2UCM)
- https://typegraphql.ml/docs/dependency-injection.html
- https://github.com/typestack/typedi#usage-with-typescript

Object lifecycle: singleton, scoped, or transient
- https://github.com/typestack/typedi/issues/24
- https://github.com/typestack/typedi

The default is for services to be scoped. However you can make them singletons or transient by doing the following:
```Typescript
// Singleton
@Service({ global: true })

// Transient
@Service({ transient: true })
```
To see more look at the ServiceOptions.d.ts which is an input type for one of the @Service() overloads.

## Testing Server

**Testing server graphql resolvers with jest**
[(YouTube Playlist) TypeGraphQL, Typeorm, & testing with Jest](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)

Note: jest by default seems to run all .test.* files so if you try to run your test setup with ts-node then it will fail when jest runs the .js code.
I've gotten around this by cleaning the dist folder before every test run. This may not be ideal but works.

For information about configuring jest to only test certain files or paths checkout:
- https://stackoverflow.com/questions/50145078/jest-typescript-tests-runs-twice-one-for-ts-files-and-one-for-js-files
- https://stackoverflow.com/questions/48318230/configure-jest-global-tests-setup-with-ts-file-typescript

## VSCode Launch & Task Configuration
---
This is important for VSCode debugging and task automation.

- https://stackoverflow.com/questions/45582698/is-it-possible-to-pass-arguments-to-a-task-in-visual-studio-code
- https://code.visualstudio.com/docs/editor/tasks
- https://code.visualstudio.com/docs/editor/tasks#_compound-tasks

## Deployment
---
**Heroku Deployment:**

```
brew tap heroku/brew && brew install heroku
heroku login
heroku create
```

If you have issues getting your project to push because it didn't attach to the new project git:
- https://stackoverflow.com/questions/18406721/heroku-does-not-appear-to-be-a-git-repository

```
heroku git:remote -a nameofproject
heroku buildpacks:set heroku/nodejs
```

There need a package.json at the root of the repository for it to work.
Use the "heroku-prebuild" script to cd, install and build your projects in nested folders.
- https://stackoverflow.com/questions/51187161/deploy-an-app-to-heroku-that-isnt-in-the-project-root
- https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps

Also you may need to remove devDependency pruning depending on when you're using them.
- https://stackoverflow.com/questions/42671260/trouble-deploying-nodejs-app-to-heroku
- https://devcenter.heroku.com/articles/nodejs-support#skip-pruning

```
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
```

Set your heroku environment variables: https://devcenter.heroku.com/articles/config-vars#managing-config-vars

You'll also need to check in the the main server file to decide if you should use dotenv otherwise it will override your heroku set environment variables.
- https://stackoverflow.com/questions/49905070/how-to-add-env-file-or-otherwise-set-environment-variables-in-a-heroku-app
- https://stackoverflow.com/questions/30047205/how-can-i-check-if-an-environment-variable-is-set-in-node-js

```Typescript
// initialize configuration
if (process.env.DEPLOYMENT === "Heroku"){
// Environment variables set in heroku 
}
else {
    dotenv.config();
}
```

Then after commiting and pushing to your git repo you can publish.

```
git push heroku master
```

**Postgres setup on Heroku:**

https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true#provision-a-database

```
heroku addons:create heroku-postgresql:hobby-dev
```

https://github.com/typeorm/typeorm/issues/278

## Severless Deployment
---

**Deploying Docker Container to Zeit**
https://www.youtube.com/watch?v=QnHch-42Hzw

**Serverless Deployment Options:**

Zeit vs. Firebase
- Firebase Functions = Zeit Serverless
- Firebases Hosting = Zeit Static Files
- Zeit Supports docker

**Deploying with Firebase:**

https://codeburst.io/graphql-server-on-cloud-functions-for-firebase-ae97441399c0

[(YouTube) Deploy An Angular App To Firebase In Minutes](https://www.youtube.com/watch?v=mF7FTWHS3ys)
```
sudo npm install -g firebase-tools
firebase login
cd server/
firebase init
```
- Select: 
    - Hosting: Configure and deploy Firebase Hosting sites
    - Functions: Configure and deploy Cloud Functions
- Select your project.
- Enter `dist` as your public directory
- ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
```
firebase deploy
```

**Zeit Now json:**
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

**Input Types**
You're not able to use graphql `type`s as input parameters for mutations. You have create a different type called an input. `type` types can only be returned. Otherwise you'll get an error like the one below.

- https://stackoverflow.com/questions/41743253/whats-the-point-of-input-type-in-graphql
- https://github.com/graphql/graphql-js/issues/599
```
{"errors":[{"message":"The type of PersonInput.images must be Input Type but got: [Image].","locations":[]}]}
```

- https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

[(YouTube Video) GraphQL Basic Types](https://www.youtube.com/watch?v=Y78PadVft7I)

**GraphQL Real-time Websocket Subscriptions:**
Graphql can also expose real-time updating queries that utilize websockets. The video below demonstrates how to do this with the apollo server.

- [(Youtube Video) How GraphQL Subscriptions Work](https://www.youtube.com/watch?v=_r2ooFgBdoc&list=PLN3n1USn4xln0j_NN9k4j5hS1thsGibKi&index=4)

**TypeGraphQL & Typeorm**
[(YouTube Playlist About TypeGraphqQL & Typeorm) TypeGrahpQL](https://www.youtube.com/watch?v=8yZImm2A1KE&list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)

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

To use a number array with postgres:
- https://github.com/typeorm/typeorm/issues/460

**Relationships:**

Many-to-many relationships:

Many-to-many relationships can be done with either a join table entity like below. This is helpful if you want other columns of information on the relationship row in the db. For example with this for a row where there's a person in an image there could be an extra column for that person <=> image relationship for the descriptor information about the person in the image.

```Typescript
import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { Person } from "./person";

@Entity()
export class personImage extends BaseEntity {

    @PrimaryColumn()
    public personId: number;

    @OneToOne(() => Person)
    @JoinColumn()
    public person: Person;

    @PrimaryColumn()
    public imageId: number;

    @OneToOne(() => Image)
    @JoinColumn()
    public image: Image;

}
```

If you don't need extra information on the relationships then you can define them like below. Pay attention to which you decide is the "owning side" of the relationship. This is the one that if you delete it you would want the other side to be deleted as well if you have cascade delete turned on.

The owning side is the one that you want to add the @JoinTable() attribute to. You must have the @JoinTable() on at least one of the two sides. This will create a join table for you in the database and does not require you to manage a mapping / join table entity like the one above. **Note: this relationships may not be a good example of which is the owning side with the @JoinTable() attribute.**

```Typescript
import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";
import { PersonsFace } from "./personsFace";

@Entity()
export class Person extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true })
    public firstSeenDateTime: string;

    @ManyToMany((type) => Image, (image) => image.persons)
    @JoinTable()
    public images: Image[];

}

import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Person } from "./person";

@Entity()
export class Image extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToMany((type) => Person, (person) => person.images)
    public persons: Person[];

    @Column({ nullable: true })
    public image: string;

}

```

Ownership and how it affects deleting entities. 



**Heroku Deployment:**

**Initialize DB If It Doesn't Exist:**

["If you are asking about "create database method", then it already exist in QueryRunner and its called createDatabase. But its not called inside ORM, you shall call it on your own."](https://github.com/typeorm/typeorm/issues/1406#issuecomment-367063415)

[Github example of doing the method mentioned above.](https://github.com/typeorm/typeorm/blob/master/test/functional/query-runner/create-and-drop-database.ts)

https://github.com/typeorm/typeorm/issues/809#issuecomment-325951226