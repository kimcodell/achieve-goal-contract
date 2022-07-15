import { Database } from ".";
import { DataTypes, Sequelize, Model } from "sequelize";
import { RegisterType } from "../types";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash?: string;
  nickname: string;
  registerType: RegisterType;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

class User extends Model<UserAttributes> {
  id!: number;
  name!: string;
  email!: string;
  passwordHash?: string;
  nickname!: string;
  registerType!: RegisterType;
  walletAddress?: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;

  static initModel(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        registerType: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        walletAddress: {
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
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        tableName: "user",
        paranoid: true,
      }
    );
  }

  static associate(db: Database) {
    db.User.hasMany(db.Post);
  }
}

export default User;
