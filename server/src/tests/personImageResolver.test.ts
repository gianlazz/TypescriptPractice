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

describe("PersonImageResolver", () => {
    it("newPerson mutation should return the db id.", async () => {
        // Arrange
        const mutation = `
        mutation {
          newPerson(inputPerson: {
            name: "gian"
            firstSeenDateTime: "now"
            images: [
              {
                image: "p2image1"
              },
              {
                image: "p2image2"
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
            images {
              id
              image
            }
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
                name: "gian",
                firstSeenDateTime: "now",
                images: [
                  {
                    id: "1",
                    image: "p2image1"
                  },
                  {
                    id: "2",
                    image: "p2image2"
                  }
                ]
              }
            ]
          }
        });
    });

    it("getAllImages should return all images in the database.", async () => {
      // Arrange
      const query = `
      query {
        getAllImages {
          id
          image
          people {
            id
            name
            firstSeenDateTime
          }
        }
      }
      `;
      // Act
      const response = await gCall({ source: query });
      // Assert
      expect(response).toMatchObject({
          data: {
            getAllImages: [
              {
                id: "1",
                image: "p2image1",
                people: [
                  {
                    id: "1",
                    name: "gian",
                    firstSeenDateTime: "now"
                  }
                ]
              },
              {
                id: "2",
                image: "p2image2",
                people: [
                  {
                    id: "1",
                    name: "gian",
                    firstSeenDateTime: "now"
                  }
                ]
              }
            ]
          }
        });
  });
});
