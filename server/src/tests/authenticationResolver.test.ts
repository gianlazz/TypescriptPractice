import { Connection } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";
import { IMyContext } from "../web/graphQL/context.interface";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
    jest.setTimeout(30000);
});
afterAll(async () => {
    await conn.close();
});

let contextSetup = (): IMyContext => {
  let cookies: {[key: string]: any} = [];
  const myContext = {
      req: {
          cookies
      } as any,
      res: {
          cookie(cookieName: string, cookie: any) {
              cookies[cookieName] = cookie;
          }
      } as any,
  };
  return myContext;
}
const ctx = contextSetup();

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
        const response = await gCall({ source: mutation, contextValue: ctx });
        // Assert
        expect(response).toMatchObject({
            data: {
              register: true
            }
          });
    });

    it("logout mutation should return true and delete the jwt cookie.", async () => {
        // Arrange
        const mutation = `
        mutation {
            logout
          }
        `;
        // Act
        const response = await gCall({ source: mutation, contextValue: ctx });
        // Assert
        expect(response).toMatchObject({
            data: {
              logout: true
            }
          });
    });

    it("login mutation should return true and store the jwt cookie.", async () => {
        // Arrange
        const mutation = `
        mutation {
            login(password: "Password0", email: "gianlazzarini@gmail.com")
          }
        `;
        // Act
        const response = await gCall({ source: mutation, contextValue: ctx });
        // Assert
        expect(response).toMatchObject({
            data: {
              login: true
            }
          });
    });

    it("me mutation should return my public user details from using my jwt to find me.", async () => {
        // Arrange
        const query = `
        query {
            me {
              id
              username
              email
            }
          }
        `;
        // Act
        const response = await gCall({ source: query, contextValue: ctx });
        // Assert
        expect(response).toMatchObject({
            data: {
              me: {
                id: "1",
                username: "glazzarini",
                email: "gianlazzarini@gmail.com"
              }
            }
          });
    });
});
