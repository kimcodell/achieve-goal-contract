import { NextFunction, Request, Response, Router } from "express";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {}

function commentRouter() {
  const router = Router();
  const handler = new RouteHandler();

  // router.get("/", wrap(handler.method.bind(handler)));

  return router;
}

export default commentRouter;
