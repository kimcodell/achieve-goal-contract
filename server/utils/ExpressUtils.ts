import { NextFunction, Request, Response } from "express";

export const wrap = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction, ...args: any[]) => {
    try {
      return await func(req, res, next, ...args);
    } catch (error) {
      return next(error);
    }
  };
};
