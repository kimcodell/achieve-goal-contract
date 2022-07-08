import { HttpStatus } from "./../utils/Constants";
import { NextFunction, Request, Response } from "express";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";

const NotFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new ErrorWithCode(
    "Not Found",
    `알 수 없는 경로입니다. path: ${req.path}`,
    { status: HttpStatus.NOT_FOUND }
  );
  error.stack = "";
  res.status(HttpStatus.NOT_FOUND);
  next(error);
};

export default NotFoundErrorHandler;
