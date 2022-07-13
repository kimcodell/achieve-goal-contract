import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import Post from "../models/post.model";
import User from "../models/user.model";
import WritingPostDto from "../types/dtos/WritingPost.dto";
import { DayToMillisecondsOffset } from "../utils/Constants";

export default class PostService {
  public async getAllPosts() {
    const posts = await Post.findAll({
      where: { deletedAt: null },
      include: { model: User, attributes: [["id", "userId"], "nickname"] },
      attributes: [["id", "postId"], "userId", "title", "distributionTokenAmount", "status", "createdAt"],
    });
    return posts;
  }

  public async getPostById(params: { postId: number }) {}

  //TODO 월렛과 배당 토큰 비교 & 시작일과 종료일 비교
  public async create(params: WritingPostDto) {
    await this._checkTokenAmount({ userId: params.userId, tokenAmount: params.distributionTokenAmount });
    await this._checkValidDate({ startDate: params.certificationStartDate, endDate: params.certificationEndDate, cycle: params.certificationCycle });

    const newPost = await Post.create(params);
    return newPost;
  }

  //TODO 월렛이 있으면 => 배당 토큰 비교
  public async update(params: {
    userId: number;
    id: number;
    title?: string;
    content?: string;
    distributionTokenAmount?: string;
    certificationTime?: number;
  }) {
    await this._checkUserIsAuthor({ userId: params.userId, postId: params.id });
    // await this._checkValidPostData(params);
  }

  public async delete(params: { userId: number; postId: number }) {
    await this._checkUserIsAuthor(params);
  }

  private async _checkUserIsAuthor(params: { userId: number; postId: number }) {
    const { userId, postId } = params;
    const post = await Post.findOne({ where: { id: postId, deletedAt: null }, attributes: ["userId"] });
    if (post.userId !== userId) {
      throw new Error("해당 게시물의 작성자가 아닙니다.");
    }
  }

  private async _checkTokenAmount(params: { userId: number; tokenAmount: string }) {}

  private async _checkValidDate(params: { startDate: string | Date; endDate: string | Date; cycle: number }) {
    const startDate = new Date(params.startDate);
    const endDate = new Date(params.endDate);

    const oneCycledDate = new Date(startDate.getDate() + params.cycle * DayToMillisecondsOffset);
    if (oneCycledDate < endDate) {
      return;
    }
    throw new ErrorWithCode("INVALID DURATION", "기간이 유효하지 않습니다.");
  }
}
