import { Connection } from "typeorm";
import { testConn } from "../test-utils/testConn";
import { async } from "q";
import { gCall } from "../test-utils/gCall";

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
        const mutation = `ENTER MUTATION HERE`;
        // Act
        const response = await gCall({ source: mutation });
        // Assert
        expect(response).toMatchObject({ ENTER EXPECTED RESPONSE HERE});
    });

    it("recognizedFaces query should return an array of PersonsFace from the db.", async () => {
        // Arrange
        const query = `ENTER QUERY HERE`;
        // Act
        const response = await gCall({ source: query });
        // Assert
        expect(response).toMatchObject({ ENTER EXPECTED RESPONSE HERE});
    })
})