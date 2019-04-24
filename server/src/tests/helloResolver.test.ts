import { gql } from "apollo-server-core";
import { graphql } from "graphql";
import { async } from "q";
import { Connection } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

const helloQuery = `
    query {
        hello
    }
`;

describe("Hello Resolver", () => {
    it("should respond with hello world", async () => {
        const response = await gCall({
            source: helloQuery
        });

        console.log(response);

        expect(response).toMatchObject({
            data: {
              hello: "Hello World!"
            }
        });
    });
});
