import * as express from "express";
import pgPromise from "pg-promise";
// Figure out why the suggested import path doesn't work
// import { Guitar } from "src/entity/guitar";
import { Guitar } from "../entity/guitar";

export const register = ( app: express.Application ) => {
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

    app.get( `/api/guitars/all`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

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
            const allGuitars = Guitar.find({userId});
            return res.json( allGuitars );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get( `/api/guitars/total`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

            // const total = await db.one( `
            // SELECT  count(*) AS total
            // FROM    guitars
            // WHERE   user_id = $[userId]`, { userId }, ( data: { total: number } ) => {
            //     return {
            //         total: +data.total
            //     };
            // } );

            const total = {};
            return res.json( total );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.get( `/api/guitars/find/:search`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

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
            return res.json( guitars );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.post( `/api/guitars/add`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

            // const id = await db.one( `
            //     INSERT INTO guitars( user_id, brand, model, year, color )
            //     VALUES( $[userId], $[brand], $[model], $[year], $[color] )
            //     RETURNING id;`,
            //     { userId, ...req.body  } );

            const id = 0;
            const response = res.json() as object;
            const newGuitar = new Guitar();
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.post( `/api/guitars/update`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

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
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

    app.delete( `/api/guitars/remove/:id`, oidc.ensureAuthenticated(), async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            // tslint:disable-next-line:no-console
            console.error(userId);

            // const id = await db.result( `
            //     DELETE
            //     FROM    guitars
            //     WHERE   user_id = $[userId]
            //     AND     id = $[id]`,
            //     { userId, id: req.params.id  }, ( r ) => r.rowCount );

            const id = 0;
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );
};
