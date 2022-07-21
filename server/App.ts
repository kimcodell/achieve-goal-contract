import fs from "fs";
import { HttpStatus } from "./utils/Constants";
import cookieParser from "cookie-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import { load } from "js-yaml";
import createRootRouter from "./routers";
import errorHandler from "./middlewares/errorHandler";
import NotFoundErrorHandler from "./middlewares/notFoundErrorHandler";
import db from "./models";
import { cryptoHelper } from "./utils/CryptoHelper";
import { interval } from "rxjs";

const swaggerDocument = load(fs.readFileSync("./swagger/swagger.yaml", "utf8"));

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
        credentials: true,
      })
    );
    app.use(this._allowCookie);
    this._setCryptoHelper();

    app.use("/v1/api-docs", serve, setup(swaggerDocument));

    interval(3600000).subscribe(console.log);

    const router = createRootRouter(db.sequelize);
    app.use("/", router);

    app.use(errorHandler);
    app.use(NotFoundErrorHandler);

    return app;
  }

  private _allowCookie(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
  }

  private _setCryptoHelper() {
    cryptoHelper.setup({ jwtSecret: "achieve-goal-contract", bcryptRound: 10 });
  }
}
