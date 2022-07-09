import { Sequelize } from "sequelize";
import dbConfig from "./config";
import User from "./user.model";
import Post from "./post.model";
import CertiPost from "./certiPost.model";
import Comment from "./comment.model";
import GoalToCheck from "./goalToCheck.model";
import Transaction from "./transaction.model";

const mode = process.env.MODE;

export interface Database {
  User: typeof User;
  Post: typeof Post;
  CertiPost: typeof CertiPost;
  Comment: typeof Comment;
  GoalToCheck: typeof GoalToCheck;
  Transaction: typeof Transaction;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const { database, username, password, host, port, dialect } = dbConfig[mode];
const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  define: {
    timestamps: true,
  },
  pool: {
    max: 50,
    min: 10,
    acquire: 20000,
  },
});

const db = {} as Database;

db.User = User;
db.Post = Post;
db.CertiPost = CertiPost;
db.Comment = Comment;
db.GoalToCheck = GoalToCheck;
db.Transaction = Transaction;

Object.keys(db).forEach((modelName) => {
  db[modelName].initModel(sequelize);
});

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
