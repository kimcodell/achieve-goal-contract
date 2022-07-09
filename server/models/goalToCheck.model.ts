import { DataTypes, Sequelize, Model, DataType } from "sequelize";
import { Database } from ".";

export interface GoalToCheckAttributes {
  id: number;
  postId: number;
  isDone: 0 | 1;
  createdAt: string;
  updatedAt: string;
}

class GoalToCheck extends Model<GoalToCheckAttributes> {
  id!: number;
  postId!: number;
  isDone!: 0 | 1;
  createdAt!: string;
  updatedAt!: string;

  static initModel(sequelize: Sequelize) {
    return GoalToCheck.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        postId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isDone: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        tableName: "goalToCheck",
      }
    );
  }

  static associate(db: Database) {}
}

export default GoalToCheck;
