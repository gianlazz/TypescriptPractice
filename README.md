## Experimental Project To Investigate Typescript/NodeJS Tech Stack

## Technologies: 
---
- Nodejs
    - Typescript
    - Express
    - EJS
    - TypeORM
    - VueJS
- Postgres
- Docker?
   - Docker Compose?
- GraphQL?

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

#### TypeScript Language Features:
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://stackoverflow.com/questions/32906097/preprocessor-defines-in-typescript
- https://github.com/Microsoft/TypeScript/issues/4691#issuecomment-298653700

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