"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const guitar_1 = require("../../dal/entity/guitar");
// Q: Why the suggested import path doesn't work?
// import { Guitar } from "src/entity/guitar";
// A: Because the tsconfig.json baseUrl and paths aren't configured correctly
exports.register = (app) => {
    // Authorization
    const oidc = app.locals.oidc;
    // Postgres db connection
    // const port = parseInt( process.env.PGPORT || "5432", 10 );
    // const config = {
    //     database: process.env.PGDATABASE || "postgres",
    //     host: process.env.PGHOST || "localhost",
    //     port,
    //     user: process.env.PGUSER || "postgres"
    // };
    // const pgp = pgPromise();
    // const db = pgp( config );
    app.get(`/api/guitars/all`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("All");
            // const guitars = await db.any( `
            //     SELECT
            //         id
            //         , brand
            //         , model
            //         , year
            //         , color
            //     FROM    guitars
            //     WHERE   user_id = $[userId]
            //     ORDER BY year, brand, model`, { userId } );
            // return res.json( guitars );
            // const allGuitars = Guitar.find();
            const allGuitars = yield guitar_1.Guitar.find({ userId });
            console.log(allGuitars);
            return res.json(allGuitars);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/guitars/total`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("Total");
            // const total = await db.one( `
            // SELECT  count(*) AS total
            // FROM    guitars
            // WHERE   user_id = $[userId]`, { userId }, ( data: { total: number } ) => {
            //     return {
            //         total: +data.total
            //     };
            // } );
            const total = {};
            return res.json(total);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.get(`/api/guitars/find/:search`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("Search");
            // const guitars = await db.any( `
            //     SELECT
            //         id
            //         , brand
            //         , model
            //         , year
            //         , color
            //     FROM    guitars
            //     WHERE   user_id = $[userId]
            //     AND   ( brand ILIKE $[search] OR model ILIKE $[search] )`,
            //     { userId, search: `%${ req.params.search }%` } );
            const guitars = {};
            return res.json(guitars);
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.post(`/api/guitars/add`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("Add");
            console.log("req.body: " + req.body);
            console.log("req.json: " + req.json);
            // const id = await db.one( `
            //     INSERT INTO guitars( user_id, brand, model, year, color )
            //     VALUES( $[userId], $[brand], $[model], $[year], $[color] )
            //     RETURNING id;`,
            //     { userId, ...req.body  } );
            const id = 0;
            const response = req.body;
            const newGuitar = new guitar_1.Guitar();
            newGuitar.userId = userId;
            newGuitar.year = response.year;
            newGuitar.brand = response.brand;
            newGuitar.model = response.model;
            newGuitar.color = response.color;
            console.log("newGuitar Id: " + newGuitar.id);
            guitar_1.Guitar.create(newGuitar);
            newGuitar.save();
            console.log("newGuitar Id after saving: " + newGuitar.id);
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.post(`/api/guitars/update`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("Update");
            // const id = await db.one( `
            //     UPDATE guitars
            //     SET brand = $[brand]
            //         , model = $[model]
            //         , year = $[year]
            //         , color = $[color]
            //     WHERE
            //         id = $[id]
            //         AND user_id = $[userId]
            //     RETURNING
            //         id;`,
            //     { userId, ...req.body  } );
            const id = 0;
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
    app.delete(`/api/guitars/remove/:id`, oidc.ensureAuthenticated(), (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            console.log("Remove");
            console.log("Remove: " + req.params.id);
            // const id = await db.result( `
            //     DELETE
            //     FROM    guitars
            //     WHERE   user_id = $[userId]
            //     AND     id = $[id]`,
            //     { userId, id: req.params.id  }, ( r ) => r.rowCount );
            // await Guitar.remove({ id: req.params.id });
            // const guitar = await Guitar.find(req.params.id);
            yield guitar_1.Guitar.delete(req.params.id);
            const id = 0;
            return res.json({ id });
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
};
//# sourceMappingURL=api.js.map