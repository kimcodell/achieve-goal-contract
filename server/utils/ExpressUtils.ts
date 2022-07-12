import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "./Constants";

export const wrap = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction, ...args: any[]) => {
    try {
      return await func(req, res, next, ...args);
    } catch (error) {
      return next(error);
    }
  };
};

export const successResponse = (res: Response, data: any) => {
  res.status(HttpStatus.OK).send({success: true, data});
}
