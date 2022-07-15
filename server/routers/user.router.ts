import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { authGuard } from "../guards/auth.guard";
import UserService from "../services/user.service";
import { successResponse, wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private userService: UserService) {}

  @authGuard
  public async getMyInfo(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const myInfo = await this.userService.getUserById({ userId: data.id });
      successResponse(res, myInfo);
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = Joi.object({
        userId: Joi.number().required(),
      }).validate(req.params);
      if (error) throw error;
      const { userId } = value;
      const user = await this.userService.getUserById({ userId });
      delete user.walletAddress;
      successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async update(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        nickname: Joi.string().max(12).optional(),
        walletAddress: Joi.string().optional(),
      })
        .min(1)
        .validate(req.body);
      if (error) throw error;
      await this.userService.update({ ...value, userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async withdraw(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      await this.userService.delete({ userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }
}

function userRouter(...parasms: [UserService]) {
  const router = Router();
  const handler = new RouteHandler(...parasms);

  router.get("/me", wrap(handler.getMyInfo.bind(handler)));
  router.get("/:userId", wrap(handler.getUserById.bind(handler)));
  router.put("", wrap(handler.update.bind(handler)));
  router.delete("", wrap(handler.withdraw.bind(handler)));

  return router;
}

export default userRouter;
