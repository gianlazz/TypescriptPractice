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

describe("ImageResolver", () => {
    it("getAllImages should return all images in the database.", async () => {
        // Arrange
        const query = `
        query {
            getAllImages {
              id
              image
            }
          }
        `;
        // Act
        const response = gCall({ source: query });
        // Assert
        expect(response).toMatchObject({
            data: {
              getAllImages: []
            }
          });
    });
});
