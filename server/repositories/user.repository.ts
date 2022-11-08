import User from "../models/user.model";
import SignUpDto from "../types/dtos/SignUp.dto";

export default class UserRepository {
  public async createUser(data: Omit<SignUpDto & { passwordHash: string }, "password">) {
    const newUser = await User.create(data);
    return newUser;
  }

  public async getWalletAddress(userId: number): Promise<string | null> {
    const user = await User.findOne({ where: { id: userId, deletedAt: null }, attributes: ["walletAddress"] });
    return user?.walletAddress ? user.walletAddress : null;
  }

  public async findUserByNickname(nickname: string) {
    const user = await User.findOne({ where: { nickname, deletedAt: null } });
    return user;
  }

  public async findUserByEmail(email: string, includePasswordHash: boolean = false) {
    const user = await User.findOne({ where: { email, deletedAt: null }, attributes: { exclude: ["updatedAt", "deletedAt"] } });
    if (!user) {
      return user;
    }
    if (!includePasswordHash) {
      delete user.passwordHash;
    }
    return user;
  }
}
