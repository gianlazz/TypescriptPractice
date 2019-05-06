import { AuthChecker } from "type-graphql";
import { IMyContext } from "./context.interface";

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

    return false; // or false if access is denied
  };
