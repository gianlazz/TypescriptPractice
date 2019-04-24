import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "test",
        password: "Password123",
        database: "postgres-test",
        synchronize: drop,
        logging: false,
        dropSchema: drop,
        entities: [
            __dirname + "/../dal/entity/**/*.ts"
        ],
    });
};
