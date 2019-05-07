import { AuthChecker } from "type-graphql";
import { IMyContext } from "./context.interface";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "./resolvers/authenticationResolver";

export const customAuthChecker: AuthChecker<IMyContext> = (
    { root, args, context, info },
    roles,
  ) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    // if (context.req.cookies.) {
    //   return true;
    // }

    if (!context.req.cookies["access-token"]) {
      console.error("Custom Auth Checker didn't find an access-token.");
      return false;
    }
    const accessToken = context.req.cookies["access-token"];
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
    if (data.userId) {
      return true;
    }

    return false; // or false if access is denied
  };
