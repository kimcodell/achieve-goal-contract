import CertiPost from "../models/certiPost.model";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import User from "../models/user.model";

export default class PostRepository {
  public async findAllPost() {
    const posts = await Post.findAll({
      where: { deletedAt: null },
      include: [{ model: User, attributes: [] }],
      attributes: [["id", "postId"], "userId", "title", "distributionTokenAmount", "status", "createdAt", "User.nickname"],
      raw: true,
    });
    return posts;
  }

  //TODO 상세 정보 (댓글, 인증 글)
  public async findById(postId: number) {
    const post = await Post.findOne({
      where: { id: postId },
      attributes: [
        ["id", "postId"],
        "userId",
        "title",
        "content",
        "distributionTokenAmount",
        "certificationStartDate",
        "certificationEndDate",
        "certificationCycle",
        "certificationTime",
        "status",
        "createdAt",
        "User.nickname",
      ],
      include: [
        { model: Comment, attributes: [] },
        { model: CertiPost, attributes: [] },
        { model: User, attributes: [] },
      ],
    });
    return post;
  }
}
