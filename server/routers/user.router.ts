import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import UserService from "../services/user.service";
import { successResponse, wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private userService: UserService) {}

  public async getMyInfo(req: Request, res: Response, next: NextFunction, data: any) {
    const myInfo = await this.userService.findById({ userId: data.id }); //TODO auth guard 넣어서 id 추가
    successResponse(res, myInfo);
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const { error, value } = Joi.object({
      userId: Joi.number().required(),
    }).validate(req.params);
    if (error) throw error;
    const { userId } = value;
    const user = await this.userService.findById({ userId });
    delete user.walletAddress;
    successResponse(res, user);
  }

  public async update(req: Request, res: Response, next: NextFunction, data: any) {
    const { error, value } = Joi.object({
      nickname: Joi.string().max(12).optional(),
      walletAddress: Joi.string().optional(),
    })
      .min(1)
      .validate(req.body);
    if (error) throw error;
    await this.userService.update({ ...value, userId: 1 }); //TODO auth guard 추가 후 userId 추가
    successResponse(res, {});
  }

  public async withdraw(req: Request, res: Response, next: NextFunction, data: any) {
    await this.userService.delete({ userId: 1 }); //TODO auth guard 추가 후 userId 추가
    successResponse(res, {});
  }
}

function userRouter(...parasms: [UserService]) {
  const router = Router();
  const handler = new RouteHandler(...parasms);

  router.get("/me", wrap(handler.getMyInfo.bind(handler)));
  router.get("/:userId", wrap(handler.findById.bind(handler)));
  router.put("", wrap(handler.update.bind(handler)));
  router.delete("", wrap(handler.withdraw.bind(handler)));

  return router;
}

export default userRouter;
