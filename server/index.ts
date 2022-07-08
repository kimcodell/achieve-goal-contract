import { config } from "dotenv";
import process from "process";
import App from "./App";

config();

const PORT = process.env.PORT || "8080";

const APP = new App();
APP.setUp()
  .then((app) => {
    app.listen(PORT, () => {
      console.log("Express Server listening on port", PORT);
    });
  })
  .catch(console.log);
