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

describe("Guitar Resolver", () => {
    it("createGuitar mutation should return guitar", async () => {
        // Arrange
        const mutation = `mutation {
		createGuitar(
		  userId: "1"
		  brand: "test"
		  model: "test"
		  year: 5
		  color: "green"
		){
		  id
		  userId
		  brand
		  model
		  year
		  color
		}
	  }`;
        // Act
        const response = await gCall({ source: mutation });
        console.log(response);

        // Assert
        expect(response).toMatchObject({
            data: {
                createGuitar: {
                    id: "1",
                    userId: "1",
                    brand: "test",
                    model: "test",
                    year: 5,
                    color: "green"
                }
            }
        });
    });

    it("guitar query should respond with guitars in the db.", async () => {
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

        expect(response).toMatchObject({
            data: {
                guitars: [
                    {
                        id: "1",
                        userId: "1",
                        brand: "test",
                        model: "test",
                        year: 5,
                        color: "green"
                    }
                ]
            }
        });
    });
});
