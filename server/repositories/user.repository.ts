import User from "../models/user.model";

export default class UserRepository {
  public async getWalletAddress(userId: number): Promise<string | null> {
    const user = await User.findOne({where: {id: userId, deletedAt: null}, attributes: ["walletAddress"]});
    return user?.walletAddress ? user.walletAddress : null;
  }
}
