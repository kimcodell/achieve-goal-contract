import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import UserService from "../services/user.service";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private userService: UserService) {}

  public async getMyInfo(req: Request, res: Response, next: NextFunction, data: any) {
    const myInfo = await this.userService.findById({ userId: data.id }); //TODO auth guard 넣어서 id 추가
    res.send(myInfo);
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
    res.send({});
  }
}

function userRouter(...parasms: [UserService]) {
  const router = Router();
  const handler = new RouteHandler(...parasms);

  router.get("/me", wrap(handler.getMyInfo.bind(handler)));
  router.put("", wrap(handler.update.bind(handler)));

  return router;
}

export default userRouter;
