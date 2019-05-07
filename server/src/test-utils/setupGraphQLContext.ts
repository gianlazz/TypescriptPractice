import { IMyContext } from "../web/graphQL/context.interface";

export const contextSetup = (): IMyContext => {
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