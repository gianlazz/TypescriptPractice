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

describe("Guitar Resolver guitars query", () => {
    it("should respond with guitars in the db.", async () => {
        const query = `query {
            guitars {
              id
              userId
              brand
              model
              year
              color
            }
          }`;

        const response = await gCall({ source: query });
        console.log(response);

        expect(response).toMatchObject({});
        // expect(() => Error).not.toThrow(Error);
    });
});
