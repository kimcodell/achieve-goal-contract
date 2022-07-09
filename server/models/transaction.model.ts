import { DataTypes, Sequelize, Model, DataType } from "sequelize";
import { Database } from ".";
import { TransactionJobStatus } from "../types";

export interface TransactionAttributes {
  id: number;
  jobName: string;
  transactionHash?: string;
  contractAddress?: string;
  fromAddress?: string;
  toAddress?: string;
  amount?: string;
  status: TransactionJobStatus;
  createdAt: string;
  updatedAt: string;
}

class Transaction extends Model<TransactionAttributes> {
  id!: number;
  jobName!: string;
  transactionHash?: string;
  contractAddress?: string;
  fromAddress?: string;
  toAddress?: string;
  amount?: string;
  status!: TransactionJobStatus;
  createdAt!: string;
  updatedAt!: string;

  static initModel(sequelize: Sequelize) {
    return Transaction.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        jobName: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        transactionHash: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        contractAddress: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        fromAddress: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        toAddress: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        amount: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: TransactionJobStatus.PENDING,
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
        tableName: "transaction",
      }
    );
  }

  static associate(db: Database) {}
}

export default Transaction;
