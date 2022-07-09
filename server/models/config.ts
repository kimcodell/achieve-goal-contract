import { config } from "dotenv";

config();

export default {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "achieve-goal-contract",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "achieve-goal-contract",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
