import { ErrorWithCode } from "./../interfaces/ErrorWithCode";
import User from "../models/user.model";
import _ from "lodash";

export default class UserService {
  public async getUserById(params: { userId: number }) {
    const { userId } = params;

    const user = await User.findOne({
      where: { id: userId, deletedAt: null },
      attributes: ["id", "name", "nickname", "registerType", "email", "walletAddress", "createdAt"],
    });

    if (!user) {
      throw new ErrorWithCode("INVALID USER", "해당 유저는 존재하지 않거나 이미 탈퇴하였습니다.");
    }
    return user;
  }

  public async update(params: { userId: number; nickname: string; walletAddress: string }) {
    const { userId } = params;

    const isValidUser = await this.existUser({ userId });
    if (!isValidUser) {
      throw new ErrorWithCode("INVALID USER", "해당 유저는 존재하지 않거나 이미 탈퇴하였습니다.");
    }

    const updatedValue = _.omitBy(_.omit(params, "userId"), _.isNil);
    await User.update(updatedValue, { where: { id: userId, deletedAt: null } });
  }

  public async delete(params: { userId: number }) {
    const { userId } = params;

    const isValidUser = await this.existUser({ userId });
    if (!isValidUser) {
      throw new ErrorWithCode("INVALID USER", "해당 유저는 존재하지 않거나 이미 탈퇴하였습니다.");
    }
    await User.update({ deletedAt: new Date().toISOString() }, { where: { id: userId } });
  }

  public async existUser(params: { userId: number }) {
    const { userId: id } = params;
    const user = await User.findOne({ where: { id, deletedAt: null }, attributes: ["id"] });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
