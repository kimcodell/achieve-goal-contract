import _ from "lodash";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import Post from "../models/post.model";
import PostRepository from "../repositories/post.repository";
import WritingPostDto from "../types/dtos/WritingPost.dto";

export default class PostService {
  constructor(private postRepository: PostRepository) {}

  public async getAllPosts() {
    const posts = await this.postRepository.findAllPost();
    return posts;
  }

  public async getPostById(params: { postId: number }) {
    const post = await this.postRepository.findById(params.postId);
    return post;
  }

  //TODO 월렛과 배당 토큰 비교 & 시작일과 종료일 비교
  public async create(params: WritingPostDto) {
    await this._checkValidDate({ startDate: params.certificationStartDate, endDate: params.certificationEndDate, cycle: params.certificationCycle });
    await this._checkTokenAmount({ userId: params.userId, tokenAmount: params.distributionTokenAmount });

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
    const { userId, id, distributionTokenAmount } = params;
    await this._checkUserIsAuthor({ userId, postId: id });
    if (distributionTokenAmount) {
      await this._checkTokenAmount({ userId, tokenAmount: distributionTokenAmount });
    }
    const data = _.omitBy(_.omit(params, ["userId", "id"]), _.isNil);
    await Post.update(data, { where: { id } });
  }

  public async delete(params: { userId: number; postId: number }) {
    await this._checkUserIsAuthor(params);
    await Post.destroy({ where: { id: params.postId } });
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
    const oneCycledDate = startDate;
    oneCycledDate.setDate(oneCycledDate.getDate() + params.cycle);
    if (oneCycledDate < endDate) {
      return;
    }
    throw new ErrorWithCode("INVALID DURATION", "기간이 유효하지 않습니다.");
  }
}
