import { DataTypes, Sequelize, Model } from "sequelize";
import { Database } from ".";
import { PostStatus } from "../types";

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
  status: PostStatus; //1: 진행 중, 2: 달성 성공, 3: 달성 실패
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
  status!: PostStatus;
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
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: PostStatus.IN_PROGRESS,
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
          defaultValue: null,
        },
      },
      {
        sequelize,
        tableName: "post",
        paranoid: true,
      }
    );
  }

  static associate(db: Database) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.CertiPost);
  }
}

export default Post;
