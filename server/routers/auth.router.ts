import { NextFunction, Request, Response, Router } from "express";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }

  public async loginByEmail(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }

  public async loginByNaver(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }

}

function authRouter() {
  const router = Router();
  const handler = new RouteHandler();

  router.post("/signup", wrap(handler.create.bind(handler)));
  router.post("/email", wrap(handler.loginByEmail.bind(handler)));
  router.post("/naver", wrap(handler.loginByNaver.bind(handler)));
  router.put("/", wrap(handler.update.bind(handler)));

  return router;
}

export default authRouter;
