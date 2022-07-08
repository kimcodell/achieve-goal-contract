import { NextFunction, Request, Response, Router } from "express";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {}

function authRouter() {
  const router = Router();
  const handler = new RouteHandler();

  // router.get("/", wrap(handler.method.bind(handler)));

  return router;
}

export default authRouter;
