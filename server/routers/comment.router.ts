import { NextFunction, Request, Response, Router } from "express";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {}

function commentRouter() {
  const router = Router();
  const handler = new RouteHandler();

  // router.post("/", wrap(handler.create.bind(handler)));
  // router.put("/", wrap(handler.update.bind(handler)));

  return router;
}

export default commentRouter;
