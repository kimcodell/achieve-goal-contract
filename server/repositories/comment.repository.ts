import Comment from "../models/comment.model";
import User from "../models/user.model";

export default class CommentRepository {
  public async getCommentsOfPostId(postId: number) {
    const comments = await Comment.findAll({where: {postId, deletedAt: null}, attributes: ["id", "userId", "comment", "createdAt", "User.nickname"], include: {model: User, attributes: []}, raw: true});
    return comments;
  }
}
