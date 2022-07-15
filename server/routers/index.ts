import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import commentRouter from "./comment.router";
import transactionRouter from "./transaction.router";
import UserService from "../services/user.service";
import PostService from "../services/post.service";
import PostRepository from "../repositories/post.repository";

const createRootRouter = () => {
  const postRepository = new PostRepository();

  const userService = new UserService();
  const postService = new PostService(postRepository);

  const router = Router();

  router.get("", (req: Request, res: Response) => {
    res.send("api server");
  });

  router.use("/v1/auth", authRouter());
  router.use("/v1/user", userRouter(userService));
  router.use("/v1/post", postRouter(postService));
  router.use("/v1/comment", commentRouter());
  router.use("/v1/transaction", transactionRouter());

  return router;
};

export default createRootRouter;
