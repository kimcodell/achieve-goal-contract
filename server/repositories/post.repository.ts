import { MillisecondsToDateOffset } from "./../utils/Constants";
import { PostStatus } from "./../types/index";
import { Op, Sequelize } from "sequelize";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import User from "../models/user.model";
import CertiPostRepository from "./certiPost.repository";
import CommentRepository from "./comment.repository";

export default class PostRepository {
  constructor(private sequelize: Sequelize, private commentRepository: CommentRepository, private certiPostRepository: CertiPostRepository) {}

  public async getAllPosts(userId?: number) {
    const posts = await Post.findAll({
      where: { deletedAt: null, ...(userId ? { userId } : {}) },
      include: [{ model: User, attributes: [] }],
      attributes: [["id", "postId"], "userId", "title", "distributionTokenAmount", "status", "createdAt", "User.nickname"],
      raw: true,
      order: [["createdAt", "DESC"]],
    });
    return posts;
  }

  public async getPostById(postId: number) {
    const post = (await Post.findOne({
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
    })) as Post & { nickname: string };
    if (!post) throw new Error("존재하지 않는 게시글입니다.");
    const [comments, certiPosts] = await Promise.all([
      this.commentRepository.getCommentsOfPostId(postId),
      this.certiPostRepository.getCertiPostsOfPostId(postId),
    ]);

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
      certiPosts,
    };
  }

  public async getAllCommentingPosts(userId: number) {
    const commentingPosts = await Comment.findAll({ where: { userId, deletedAt: null }, attributes: ["postId"] });
    const commentingPostIds = commentingPosts.map((comment) => comment.postId);

    const posts = await Post.findAll({
      where: { id: { [Op.in]: commentingPostIds }, deletedAt: null },
      attributes: [["id", "postId"], "userId", "title", "distributionTokenAmount", "status", "createdAt", "User.nickname"],
      raw: true,
      include: [{ model: User, attributes: [] }],
    });
    return posts;
  }

  public async getCheckablePosts(certificationTime: number) {
    const checkablePosts = await Post.findAll({
      where: { status: PostStatus.IN_PROGRESS, certificationTime, deletedAt: null },
      attributes: { exclude: ["deletedAt"] },
    });
    return checkablePosts.filter((post) => {
      const nowDate = new Date().setHours(0, 0, 0, 0);
      const postStartDate = new Date(post.certificationStartDate).setHours(0, 0, 0, 0);
      const termFromStartDate = (nowDate - postStartDate) / MillisecondsToDateOffset;
      if (termFromStartDate % post.certificationCycle === 0) {
        return true;
      }
      return false;
    });
  }
}
