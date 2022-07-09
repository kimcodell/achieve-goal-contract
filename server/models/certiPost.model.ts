import { DataTypes, Sequelize, Model, DataType } from "sequelize";
import { Database } from ".";

export interface CertiPostAttributes {
  id: number;
  postId: number;
  comment: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

class CertiPost extends Model<CertiPostAttributes> {
  id!: number;
  postId!: number;
  comment!: string;
  imageUrl?: string;
  createdAt!: string;
  updatedAt!: string;

  static initModel(sequelize: Sequelize) {
    return CertiPost.init(
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
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING(255),
          allowNull: true,
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
        tableName: "certiPost",
      }
    );
  }

  static associate(db: Database) {}
}

export default CertiPost;
