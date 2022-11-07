import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { authGuard } from "../guards/auth.guard";
import CertiPostService from "../services/certiPost.service";
import { successResponse, wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private certiPostService: CertiPostService) {}

  @authGuard
  public async create(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        postId: Joi.number().required(),
        iamgeUrl: Joi.string().uri().required(),
        comment: Joi.string().max(100).required(),
      }).validate(req.body);
      if (error) throw error;
      const newCertiPost = await this.certiPostService.create({ ...value, userId: data.id });
      successResponse(res, newCertiPost);
    } catch (error) {
      next(error);
    }
  }

  public async getAllCertiPosts(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        postId: Joi.number().required(),
      }).validate(req.params);
      if (error) throw error;
      const certiPosts = await this.certiPostService.getAllCertiPosts({ ...value });
      successResponse(res, certiPosts);
    } catch (error) {
      next(error);
    }
  }
}

function certiPostRouter(...params: [CertiPostService]) {
  const router = Router();
  const handler = new RouteHandler(...params);

  router.get("/:postId", wrap(handler.getAllCertiPosts.bind(handler)));
  router.post("/", wrap(handler.create.bind(handler)));

  return router;
}

export default certiPostRouter;
