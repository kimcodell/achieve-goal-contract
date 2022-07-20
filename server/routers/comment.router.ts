import { successResponse } from "./../utils/ExpressUtils";
import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";
import { authGuard } from "../guards/auth.guard";
import CommentService from "../services/comment.service";
import { wrap } from "../utils/ExpressUtils";

class RouteHandler {
  constructor(private commentService: CommentService) {}

  @authGuard
  public async create(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        postId: Joi.number().required(),
        comment: Joi.string().max(100).required(),
      }).validate(req.body);
      if (error) throw error;
      const newComment = await this.commentService.create({ ...value, userId: data.id });
      successResponse(res, newComment);
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async update(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        commentId: Joi.number().required(),
        comment: Joi.string().max(100).required(),
      }).validate(req.body);
      if (error) throw error;
      await this.commentService.update({ ...value, userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }

  @authGuard
  public async delete(req: Request, res: Response, next: NextFunction, data: any) {
    try {
      const { error, value } = Joi.object({
        commentId: Joi.number().required(),
      }).validate(req.body);
      if (error) throw error;
      await this.commentService.delete({ ...value, userId: data.id });
      successResponse(res, {});
    } catch (error) {
      next(error);
    }
  }
}

function commentRouter(...params: [CommentService]) {
  const router = Router();
  const handler = new RouteHandler(...params);

  router.post("/", wrap(handler.create.bind(handler)));
  router.put("/", wrap(handler.update.bind(handler)));
  router.delete("/", wrap(handler.delete.bind(handler)));

  return router;
}

export default commentRouter;
