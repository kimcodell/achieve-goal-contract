import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import AuthService from "../services/auth.service";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private authService: AuthService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {error, value } = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().optional(),
        nickname: Joi.string().required(),
        registerType: Joi.allow([1, 2]).required(),
      }).validate(req.body);
      if (error) throw error;

      const newUser = await this.authService.create(value);
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

  public async checkNicknameDuplication(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }

  public async checkEmailDuplication(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error);
    }
  }
}

function authRouter(...params: [AuthService]) {
  const router = Router();
  const handler = new RouteHandler(...params);

  router.post("/signup", wrap(handler.create.bind(handler)));
  router.post("/email", wrap(handler.loginByEmail.bind(handler)));
  router.post("/naver", wrap(handler.loginByNaver.bind(handler)));
  router.put("/", wrap(handler.update.bind(handler)));

  router.post("/check/nickname", wrap(handler.checkNicknameDuplication.bind(handler)));
  router.post("/check/email", wrap(handler.checkEmailDuplication.bind(handler)));

  return router;
}

export default authRouter;
