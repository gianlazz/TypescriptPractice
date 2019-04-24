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

describe("PersonsFace Resolver", () => {
    it("registerPersonsFace mutation should return the id of the saved entity.", async () => {
        // Arrange
        const mutation = `mutation {
            registerPersonsFace(
              name: "Gian",
              image: "sdf",
              descriptor: []
            )
          }`;
        // Act
        const response = await gCall({ source: mutation });
        // Assert
        expect(response).toMatchObject({
            data: {
                registerPersonsFace: 1
            }
        });
    });

    it("recognizedFaces query should return an array of PersonsFace from the db.", async () => {
        // Arrange
        const query = `query {
            recognizedFaces {
              id
              name
              image
              descriptor
            }
          }`;
        // Act
        const response = await gCall({ source: query });
        // Assert
        expect(response).toMatchObject({
            data: {
                recognizedFaces: [
                    {
                        id: "1",
                        name: "Gian",
                        image: "sdf",
                        descriptor: []
                    }
                ]
            }
        });
    });

    it("deleteRegisteredPersonsFaceByName mutation should return that 1 line was affected by delete.",
        async () => {
            // Arrange
            const mutation = `mutation {
                deleteRegisteredPersonsFaceByName(name: "Gian")
              }`;
            // Act
            const response = await gCall({ source: mutation });
            // Assert
            expect(response).toMatchObject({
                data: {
                    deleteRegisteredPersonsFaceByName: 1
                }
            });
        });
});
