import { HttpStatus } from "./utils/Constants";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import cors from "cors";
import createRootRouter from "./routers";
import errorHandler from "./middlewares/errorHandler";
import NotFoundErrorHandler from "./middlewares/notFoundErrorHandler";

export default class App {
  public async setUp(): Promise<Express> {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cookieParser());
    app.use(
      cors({
        origin: ["http://localhost:8080", "http://localhost:3000"],
        optionsSuccessStatus: HttpStatus.OK,
      })
    );

    const router = createRootRouter();
    app.use("/", router);

    app.use(NotFoundErrorHandler);
    app.use(errorHandler);

    return app;
  }
}
