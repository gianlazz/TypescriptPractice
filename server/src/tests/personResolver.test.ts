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

describe("PersonResolver", () => {
    it("newPerson mutation should return the db id.", async () => {
        // Arrange
        const mutation = `
        mutation {
            newPerson(inputPerson: {
              name: "unknown"
              firstSeenDateTime: "now"
              images: [
                {
                  image: "base64png"
                }
              ]
            })
          }
        `;
        // Act
        const response = await gCall({ source: mutation });
        // Assert
        expect(response).toMatchObject({
            data: {
              newPerson: 1
            }
          });
    });

    it("getAllPersons query should return Person[].", async () => {
        // Arrange
        const query = `
        query {
            getAllPersons {
              id
              name
              firstSeenDateTime
            }
          }
        `;
        // Act
        const response = await gCall({ source: query });
        // Assert
        expect(response).toMatchObject({
            data: {
              getAllPersons: [
                {
                  id: "1",
                  name: "unknown",
                  firstSeenDateTime: "now"
                }
              ]
            }
          });
    });
});
