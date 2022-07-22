import { PostStatus } from "./../types/index";
import CertiPost from "../models/certiPost.model";
import Post from "../models/post.model";
import PostRepository from "../repositories/post.repository";

export default class TransactionService {
  constructor(private postRepository: PostRepository) {}

  public async checkCertification(certificationTime: number) {
    const checkablePosts = await this.postRepository.getCheckablePosts(certificationTime);
    if (checkablePosts.length === 0) {
      return;
    }
    const result: {success: Post[], fail: Post[]} = {
      success: [],
      fail: [],
    }
    for (const post of checkablePosts) {
      if (await this._checkPostIsCertified(post)) {
        if (await this._checkCertiPostIsLast(post)) {
          console.log("postId :", post.id, "목표 달성 성공");
          // await post.update({ status: PostStatus.SUCCESS }); //TODO 주석 해제
          result.success.push(post);
          
        } else {
          console.log("postId :", post.id, "인증 성공!");
        }
      } else {
        console.log("postId :", post.id, "인증 실패. 목표 달성 실패");
        // await post.update({ status: PostStatus.FAIL });  //TODO 주석 해제
        result.fail.push(post);
      }
    }
    return result;
  }

  //TODO 구현
  public async rewardAchievement(successPostData: Post[]) {}

  //TODO 구현
  public async distributeToken(failPostData: Post[]) {}

  private async _checkPostIsCertified(post: Post) {
    const certiPost = await CertiPost.findOne({ where: { postId: post.id }, order: [["id", "DESC"]] });
    if (!certiPost) {
      return false;
    }
    const certiPostUploadDate = new Date(certiPost.createdAt).setMinutes(0, 0, 0);
    const now = new Date().setMinutes(0, 0, 0);
    console.log('certiPostUploadDate', certiPostUploadDate, 'now', now);
    if (certiPostUploadDate <= now) {
      return true;
    }
    return false;
  }

  private async _checkCertiPostIsLast(post: Post) {
    const certiPost = await CertiPost.findOne({ where: { postId: post.id }, order: [["id", "DESC"]] });
    const postEndDate = new Date(post.certificationEndDate).setHours(0, 0, 0, 0);
    const certiPostUploadDate = new Date(certiPost.createdAt).setHours(0, 0, 0, 0);
    console.log(postEndDate, certiPostUploadDate);
    if (postEndDate === certiPostUploadDate) {
      return true;
    }
    return false;
  }
}
