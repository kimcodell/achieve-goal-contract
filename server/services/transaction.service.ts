import { PostStatus } from "./../types/index";
import CertiPost from "../models/certiPost.model";
import Post from "../models/post.model";
import PostRepository from "../repositories/post.repository";

export default class TransactionService {
  constructor(private postRepository: PostRepository) {}

  public async checkCertification(certificationTime: number) {
    const checkablePosts = await this.postRepository.getCheckablePosts(certificationTime);
    console.log("checkablePosts", checkablePosts);
    if (checkablePosts.length === 0) {
      return;
    }
    for (const post of checkablePosts) {
      if (await this._checkPostIsCertified(post)) {
        if (await this._checkCertiPostIsLast(post)) {
          console.log("성공");
          // post.update({ status: PostStatus.SUCCESS });
        } else {
          console.log("아무것도 아님");
        }
      } else {
        console.log("실패");
        await post.update({ status: PostStatus.FAIL });
      }
    }
  }

  public async rewardAchievement() {}

  public async distributeToken() {}

  private async _checkPostIsCertified(post: Post) {
    const certiPost = await CertiPost.findOne({ where: { postId: post.id }, order: ["id", "desc"] });
    if (!certiPost) {
      return false;
    }
    const certiPostUploadDate = new Date(certiPost.createdAt).setMinutes(0, 0, 0);
    const now = new Date().setMinutes(0, 0, 0);
    if (certiPostUploadDate === now) {
      return true;
    }
    return false;
  }

  private async _checkCertiPostIsLast(post: Post) {
    const certiPost = await CertiPost.findOne({ where: { postId: post.id }, order: ["id", "DESC"] });
    const postEndDate = new Date(post.certificationEndDate).setHours(0, 0, 0, 0);
    const certiPostUploadDate = new Date(certiPost.createdAt).setHours(0, 0, 0, 0);
    console.log(postEndDate, certiPostUploadDate);
    if (postEndDate === certiPostUploadDate) {
      return true;
    }
    return false;
  }
}
