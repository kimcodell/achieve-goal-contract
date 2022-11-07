import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import CertiPost from "../models/certiPost.model";
import Post from "../models/post.model";
import CertiPostRepository from "../repositories/certiPost.repository";

export default class CertiPostService {
  constructor(private certiPostRepository: CertiPostRepository) {}

  public async create(params: { postId: number; imageUrl: string; comment: string; userId: number }) {
    const { postId, userId, imageUrl, comment } = params;
    await this._checkIsAuthor(postId, userId);

    const certiPost = await CertiPost.create({ postId, imageUrl, comment });
    return certiPost;
  }

  public async getAllCertiPosts(params: { postId: number }) {
    const { postId } = params;
    const certiPosts = await this.certiPostRepository.getCertiPostsOfPostId(postId);
    return certiPosts;
  }

  private async _checkIsAuthor(postId: number, userId: number) {
    const post = await Post.findOne({
      where: { id: postId, deletedAt: null },
      attributes: ["userId"],
    });
    if (!post) throw new ErrorWithCode("CANNOT FIND POST", "해당 게시물은 존재하지 않거나 삭제되어 인증할 수 없습니다.");
    if (post.userId !== userId) {
      throw new ErrorWithCode("INVALID AUTHOR", "해당 게시물의 작성자가 아닙니다.");
    }
  }
}
