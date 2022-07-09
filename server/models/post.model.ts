import { DataTypes, Sequelize, Model } from "sequelize";
import { Database } from ".";

export interface PostAttributes {
  id: number;
  userId: number;
  title: string;
  content: string;
  distributionTokenAmount: string;
  certificationStartDate: string;
  certificationEndDate: string;
  certificationCycle: number; // 1, 2, 3, 5, 7일
  certificationTime: number; // 0 ~ 23시
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

class Post extends Model<PostAttributes> {
  id!: number;
  userId!: number;
  title!: string;
  content!: string;
  distributionTokenAmount!: string;
  certificationStartDate!: string;
  certificationEndDate!: string;
  certificationCycle!: number;
  certificationTime!: number;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;

  static initModel(sequelize: Sequelize) {
    return Post.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        distributionTokenAmount: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        certificationStartDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        certificationEndDate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isAfter: "certificationStartDate",
          },
        },
        certificationCycle: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        certificationTime: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        sequelize,
        tableName: "post",
        paranoid: true,
      }
    );
  }

  static associate(db: Database) {}
}

export default Post;