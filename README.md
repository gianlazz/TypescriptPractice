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

### Debugging Resources:
- https://stackoverflow.com/questions/50361948/syntaxerror-unexpected-token-import-typeorm-entity
   - ormconfig.json entities should be .js because they'll be used post build.

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

TypeORM Entity
--- 
```Typescript
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Guitar {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    brand: string;

    @Column()
    model: number;

    @Column({ nullable: true })
    year: number;

    @Column({ nullable: true })
    color: string;

}
```

 Equivalent SQL
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

Running `npm run dev` should return the following results:
```
✨  Built in 381ms.

dist/public/js/main.js.map    768.41 KB     68ms
dist/public/js/main.js        285.48 KB    273ms

> ts_practice@1.0.0 start /Users/gian.lazzarini/Development/TS_Practice
> node .

server started at http://localhost:8080
{ error: password authentication failed for user "test"
    at Connection.parseE (/Users/gian.lazzarini/Development/TS_Practice/node_modules/pg/lib/connection.js:601:11)
    at Connection.parseMessage (/Users/gian.lazzarini/Development/TS_Practice/node_modules/pg/lib/connection.js:398:19)
    at Socket.<anonymous> (/Users/gian.lazzarini/Development/TS_Practice/node_modules/pg/lib/connection.js:120:22)
    at Socket.emit (events.js:189:13)
    at addChunk (_stream_readable.js:284:12)
    at readableAddChunk (_stream_readable.js:265:11)
    at Socket.Readable.push (_stream_readable.js:220:10)
    at TCP.onStreamRead [as onread] (internal/stream_base_commons.js:94:17)
  name: 'error',
  length: 100,
  severity: 'FATAL',
  code: '28P01',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'auth.c',
  line: '328',
  routine: 'auth_failed' }
```
The error above is because you need to create the user: test with password: Password123. Then you have to create the database.