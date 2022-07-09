import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import commentRouter from "./comment.router";
import transactionRouter from "./transaction.router";

const createRootRouter = () => {
  const router = Router();

  router.get("", (req: Request, res: Response) => {
    return res.send("api server");
  });

  router.use("/v1/auth", authRouter());
  router.use("/v1/user", userRouter());
  router.use("/v1/post", postRouter());
  router.use("/v1/comment", commentRouter());
  router.use("/v1/transaction", transactionRouter());

  return router;
};

export default createRootRouter;