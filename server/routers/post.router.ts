import Joi from "joi";
import { NextFunction, Request, Response, Router } from "express";
import PostService from "../services/post.service";
import { successResponse, wrap } from "../utils/ExpressUtils";
import { authGuard } from "../guards/auth.guard";

class RouteHandler {
  constructor(private postService: PostService) {}

  public async getAllPosts(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const posts = await this.postService.getAllPosts();
      successResponse(res, posts);
    } catch (error) {
      next(error);
    }
  }

  public async getPostById(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        postId: Joi.number().required(),
      }).validate(req.params);
      if (error) throw error;
      const { postId } = value;
      const post = await this.postService.getPostById({ postId });
      successResponse(res, post);
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async create(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        distributionTokenAmount: Joi.string().required(),
        certificationStartDate: Joi.string().required(),
        certificationEndDate: Joi.string().required(),
        certificationCycle: Joi.number().required(),
        certificationTime: Joi.number().required(),
      }).validate(req.body);
      if (error) throw error;
      const newPost = await this.postService.create({ ...value, userId: data.id });
      successResponse(res, newPost);
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async update(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        distributionTokenAmount: Joi.string().optional(),
        certificationTime: Joi.number().optional(),
      }).validate(req.body);
      if (error) throw error;
      await this.postService.update({ ...value, userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async delete(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        postId: Joi.number().required(),
      }).validate(req.body);
      if (error) throw error;
      const { postId } = value;
      await this.postService.delete({ postId, userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }
}

function postRouter(...params: [PostService]) {
  const router = Router();
  const handler = new RouteHandler(...params);

  router.get("/", wrap(handler.getAllPosts.bind(handler)));
  router.get("/:postId", wrap(handler.getPostById.bind(handler)));
  router.post("/", wrap(handler.create.bind(handler)));
  router.put("/", wrap(handler.update.bind(handler)));
  router.delete("/", wrap(handler.delete.bind(handler)));

  return router;
}

export default postRouter;
