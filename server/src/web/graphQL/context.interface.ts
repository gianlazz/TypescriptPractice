import { Request, Response } from "express";
import { User } from "../../dal/entity/user";

export interface IMyContext {
  req: Request;
  res: Response;
  user?: User;
}
