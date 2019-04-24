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
        const mutation = ``;
        // Act
        const response = await gCall({ source: mutation });
        // Assert
        expect(response).toMatchObject({});
    });

    it("getAllPersonsImages query should should return array of Image.", async () => {
        // Arrange
        const query = ``;
        // Act
        const response = await gCall({ source: query });
        // Assert
        expect(response).toMatchObject({});
    });
});