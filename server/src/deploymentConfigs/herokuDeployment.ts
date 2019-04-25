import { createConnection } from "typeorm";

export const createHerokuDbConnection = () => {
    // Environment variables set in heroku dashboard
    return createConnection({
        entities: [
            "dist/dal/entity/**/*.js"
        ],
        extra: {
            ssl: true,
        },
        synchronize: true,
        type: "postgres",
        url: process.env.DATABASE_URL
    });
};
