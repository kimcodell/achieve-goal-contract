import _ from "lodash";
import Post from "../models/post.model";
import Comment from "../models/comment.model";
import PostRepository from "../repositories/post.repository";
import UserRepository from "../repositories/user.repository";
import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import { PostStatus } from "./../types/index";
import WritingPostDto from "../types/dtos/WritingPost.dto";

export default class PostService {
  constructor(private postRepository: PostRepository, private userRepository: UserRepository) {}

  public async getAllPosts() {
    const posts = await this.postRepository.getAllPosts();
    return posts;
  }

  public async getPostById(params: { postId: number }) {
    const post = await this.postRepository.getPostById(params.postId);
    return post;
  }

  public async create(params: WritingPostDto) {
    const walletAddress = await this.userRepository.getWalletAddress(params.userId);
    if (!walletAddress) {
      throw new ErrorWithCode("WALLET ADDRESS IS REQUIRED", "등록된 지갑 주소가 없습니다. 지갑을 등록한 후 게시글을 작성해 주세요.");
    }
    await this._checkValidDate({ startDate: params.certificationStartDate, endDate: params.certificationEndDate, cycle: params.certificationCycle });
    await this._checkTokenAmount({ userId: params.userId, tokenAmount: params.distributionTokenAmount });

    const newPost = await Post.create(params);
    return newPost;
  }

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
    const walletAddress = await this.userRepository.getWalletAddress(params.userId);
    if (!walletAddress) {
      throw new ErrorWithCode("WALLET ADDRESS IS REQUIRED", "등록된 지갑 주소가 없습니다. 지갑을 등록한 후 게시글을 수정해 주세요.");
    }
    if (distributionTokenAmount) {
      await this._checkTokenAmount({ userId, tokenAmount: distributionTokenAmount });
    }
    const isEditable = !(await this._isEditable({ postId: id }));
    if (!isEditable) {
      throw new ErrorWithCode("NOT EDITABLE POST", "목표 달성이 진행 중이고 응원 댓글이 없는 게시글만 수정할 수 있습니다.");
    }
    const data = _.omitBy(_.omit(params, ["userId", "id"]), _.isNil);
    await Post.update(data, { where: { id, deletedAt: null } });
  }

  public async delete(params: { userId: number; postId: number }) {
    await this._checkUserIsAuthor(params);
    const isEditable = await this._isEditable({ postId: params.postId });
    if (!isEditable) {
      throw new ErrorWithCode("NOT EDITABLE POST", "목표 달성이 진행 중이고 응원 댓글이 없는 게시글만 삭제할 수 있습니다.");
    }
    await Post.destroy({ where: { id: params.postId, deletedAt: null } });
  }

  private async _checkUserIsAuthor(params: { userId: number; postId: number }) {
    const { userId, postId } = params;
    const post = await Post.findOne({ where: { id: postId, deletedAt: null }, attributes: ["userId"] });
    if (post.userId !== userId) {
      throw new ErrorWithCode("INVALID AUTHOR", "해당 게시물의 작성자가 아닙니다.");
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

  private async _isEditable(params: { postId: number }) {
    const post = await Post.findOne({ where: { id: params.postId, deletedAt: null }, attributes: ["status"] });
    const comment = await Comment.findOne({ where: { postId: params.postId, deletedAt: null }, attributes: ["id"] });
    if (post.status === PostStatus.IN_PROGRESS && !comment) {
      return true;
    }
    return false;
  }
}
