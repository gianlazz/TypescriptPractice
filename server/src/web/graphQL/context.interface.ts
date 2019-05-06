import { Request, Response } from "express";
import { User } from "../../dal/entity/user";

export interface IMyContext {
  req: Request;
  res: Response;
  requestCookies: any;
  responseCookie: any;
  user?: User;
}
