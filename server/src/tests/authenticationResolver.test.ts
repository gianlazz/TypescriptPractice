import { Connection } from "typeorm";
import { testConn } from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
    jest.setTimeout(30000);
});
afterAll(async () => {
    await conn.close();
});

describe("AuthenticationResolver", () => {
    it("register mutation should return true and store jwt cookie.", async () => {
        // Arrange
        const mutation = `
        mutation {
            register(data: {
              username: "glazzarini",
              email: "gianlazzarini@gmail.com",
              password: "Password0"
            })
          }
        `;
        // Act
        const response = await gCall({ source: mutation });
        // Assert
        expect(response).toMatchObject({
            "data": {
              "register": true
            }
          });
    });

    
})