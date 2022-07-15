import CertiPost from "../models/certiPost.model";

export default class CertiPostRepository {
  public async getCertiPostsOfPostId(postId: number) {
    const certiPosts = await CertiPost.findAll({where: {postId}, attributes: {exclude: ["postId", "updatedAt"]}});
    return certiPosts;
  }
}