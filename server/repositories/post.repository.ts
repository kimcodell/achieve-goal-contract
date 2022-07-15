import { Sequelize } from 'sequelize';
import Post from "../models/post.model";
import User from "../models/user.model";
import CertiPostRepository from './certiPost.repository';
import CommentRepository from './comment.repository';

export default class PostRepository {
  constructor(private sequelize: Sequelize, private commentRepository: CommentRepository, private certiPostRepository: CertiPostRepository) {}

  public async findAllPost() {
    const posts = await Post.findAll({
      where: { deletedAt: null },
      include: [{ model: User, attributes: [] }],
      attributes: [["id", "postId"], "userId", "title", "distributionTokenAmount", "status", "createdAt", "User.nickname"],
      raw: true,
    });
    return posts;
  }

  public async findById(postId: number) {
    const post = await Post.findOne({
      where: { id: postId, deletedAt: null },
      attributes: [
        "id",
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
      raw: true,
      include: { model: User, attributes: [] },

    }) as Post & {nickname: string;};
    if (!post) throw new Error("존재하지 않는 게시글입니다.");
    const [comments, certiPost] = await Promise.all([this.commentRepository.findCommentsOfPostId(postId), this.certiPostRepository.findCertiPostsOfPostId(postId)])

    return {
      postId: post.id,
      userId: post.userId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      distributionTokenAmount: post.distributionTokenAmount,
      certificationStartDate: post.certificationStartDate,
      certificationEndDate: post.certificationEndDate,
      certificationCycle: post.certificationCycle,
      certificationTime: post.certificationTime,
      status: post.status,
      createdAt: post.createdAt,
      comments,
      certiPost,
    }
  }
}
