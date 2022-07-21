import PostRepository from "../repositories/post.repository";

export default class TransactionService {
  constructor(private postRepository: PostRepository) {}

  public async checkCertification(certificationTime: number) {
    const checkablePosts = await this.postRepository.getCheckablePosts(certificationTime);
    if (checkablePosts.length === 0) {
      return null;
    }
    // await Promise.all(checkablePosts.map((post, index) => {
    // }));
  }

  public async rewardAchievement() {}

  public async distributeToken() {}
}
