import { ErrorWithCode } from "./../interfaces/ErrorWithCode";
import User from "../models/user.model";

export default class UserService {
  public async findById(params: { userId: number }) {
    const { userId } = params;

    const user = await User.findOne({
      where: { id: userId, deletedAt: null },
      attributes: { include: ["id", "name", "nickname", "registerType", "email", "walletAddress", "createdAt"] },
    });
    if (!user) {
      throw new ErrorWithCode("CANNOT FIND USER", "해당 유저는 존재하지 않거나 탈퇴하였습니다.");
    }
    return user;
  }

  public async update(params: { userId: number; nickname: string; walletAddress: string }) {
    const { userId, nickname, walletAddress } = params;

    if (!this.existUser({ userId })) {
      throw new ErrorWithCode("CANNOT FIND USER", "해당 유저는 존재하지 않거나 탈퇴하였습니다.");
    }

    const updatedValue = { ...(nickname ? { nickname } : {}), ...(walletAddress ? { walletAddress } : {}) };
    await User.update(updatedValue, { where: { id: userId, deletedAt: null } });
  }

  public async existUser(params: { userId: number }) {
    const { userId: id } = params;
    const user = await User.findOne({ where: { id, deletedAt: null }, attributes: { include: ["id"] } });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
