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
    it("newImage should process multiple images and recognize that it's the same image.", async () => {
        // Arrange
        const image = "https://fortunedotcom.files.wordpress.com/2018/07/gettyimages-961697338.jpg";
        const mutation = `
        mutation {
          newImage(inputImage: {
            image: "https://fortunedotcom.files.wordpress.com/2018/07/gettyimages-961697338.jpg"
          })
        }
        `;
        // Act
        const response1 = await gCall({ source: mutation });
        const response2 = await gCall({ source: mutation });
        // Assert
        expect(response1).toMatchObject({
          data: {
            newImage: 1
          }
        });
        expect(response2).toMatchObject({
          data: {
            newImage: 2
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
            images {
              id
              personDescriptors {
                id
              }
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
                name: null,
                images: [
                  {
                    id: "1",
                    personDescriptors: [
                      {
                        id: "1"
                      }
                    ]
                  },
                  {
                    id: "2",
                    personDescriptors: [
                      {
                        id: "2"
                      }
                    ]
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
