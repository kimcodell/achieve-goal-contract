import User from "../models/user.model";

export default class UserRepository {
  public async getWalletAddress(userId: number): Promise<string | null> {
    const user = await User.findOne({ where: { id: userId, deletedAt: null }, attributes: ["walletAddress"] });
    return user?.walletAddress ? user.walletAddress : null;
  }

  public async findUserByNickname(nickname: string) {
    const nicknames = await User.findOne({where: {nickname, deletedAt: null}})
    return
  }
  
  public async findUserByEmail(email: string) {
    const emails = await User.findOne({where: {email, deletedAt: null}, attributes: {exclude: ['updatedAt', 'deletedAt', 'passwordHash']}});
    return emails;
  }
}
