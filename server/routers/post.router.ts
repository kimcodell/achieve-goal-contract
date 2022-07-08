import { NextFunction, Request, Response, Router } from "express";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {
  public getAllPosts(req: Request, res: Response, next: NextFunction, data: any) {
    res.send("전체 게시물");
  }
}

function postRouter() {
  const router = Router();
  const handler = new RouteHandler();

  router.get("/", wrap(handler.getAllPosts.bind(handler)));

  return router;
}

export default postRouter;
