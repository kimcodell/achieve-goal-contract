import { ErrorWithCode } from "../interfaces/ErrorWithCode";
import Post from "../models/post.model";
import User from "../models/user.model";
import WritingPostDto from "../types/dtos/WritingPost.dto";

export default class PostService {
  public async getAllPosts() {
    const posts = await Post.findAll({ where: {deletedAt: null}, include: {model: User, attributes: [['id', 'userId'],'nickname']}, attributes: [['id', 'postId'], 'userId', 'title', 'distributionTokenAmount' ,'status', 'createdAt']});
    return posts;
  }

  public async getPostById(params: {postId: number}) {
  }

  public async create(params: WritingPostDto) {
    await this._checkValidPostData(params);

    const newPost = await Post.create(params);
    return newPost;
  }

  public async update(params: WritingPostDto) {
    await this._checkUserIsAuthor({userId: params.userId, postId: params.id});
    await this._checkValidPostData(params);
  }

  public async delete(params: {userId: number; postId: number}) {
    await this._checkUserIsAuthor(params);


  }

  private async _checkValidPostData(params: WritingPostDto) {
    const {userId} = params;
    const user = await User.findOne({where: {id: userId, deletedAt: null}, attributes: ["walletAddress"]});
    if (!user) throw new ErrorWithCode("INVALID USER", "해당 유저는 존재하지 않거나 이미 탈퇴하였습니다.");


    // TODO 배당 토큰 수 유효성 검사. 시작, 종료 날짜 유효성 검사
  }

  private async _checkUserIsAuthor(params: {userId: number; postId: number;}) {
    const {userId, postId} = params;
    const post = await Post.findOne({where: {id: postId, deletedAt: null}, attributes: ['userId']});
    if (post.userId !== userId) {
      throw new Error("해당 게시물의 작성자가 아닙니다.");
    }
  }
};