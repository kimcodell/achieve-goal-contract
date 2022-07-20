import { ErrorWithCode } from "./../interfaces/ErrorWithCode";
import _ from "lodash";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import { PostStatus } from "../types";

export default class CommentService {
  public async create(params: { postId: number; userId: number; comment: string }) {
    const { postId, userId } = params;

    const targetPost = await Post.findOne({ where: { id: postId, deletedAt: null }, attributes: ["userId"] });
    if (targetPost.userId !== userId) {
      throw new ErrorWithCode("CANNOT COMMENT OWN POST", "게시물 작성자는 댓글을 달 수 없습니다.");
    }

    const comment = await Comment.create(params);
    return comment;
  }

  public async update(params: { userId: number; commentId: number; comment: string }) {
    const { userId, commentId, comment } = params;

    await this._checkIsAuthor(userId, commentId);

    const isEditable = await this._isEditable(commentId);
    if (!isEditable) {
      throw new ErrorWithCode("NOT EDITABLE COMMENT", "목표 달성 진행 중이 아닌 게시물의 댓글은 수정할 수 없습니다.");
    }

    await Comment.update({ comment }, { where: { id: commentId, deletedAt: null } });
  }

  public async delete(params: { userId: number; commentId: number }) {
    const { userId, commentId } = params;

    await this._checkIsAuthor(userId, commentId);

    const isEditable = await this._isEditable(commentId);
    if (!isEditable) {
      throw new ErrorWithCode("NOT EDITABLE COMMENT", "목표 달성 진행 중이 아닌 게시물의 댓글은 삭제할 수 없습니다.");
    }

    await Comment.destroy({ where: { id: commentId, deletedAt: null } });
  }

  private async _checkIsAuthor(userId: number, commentId: number) {
    const comment = await Comment.findOne({ where: { id: commentId, deletedAt: null }, attributes: ["userId"] });
    if (comment.userId !== userId) {
      throw new ErrorWithCode("INVALID AUTHOR", "해당 댓글의 작성자가 아닙니다.");
    }
  }

  private async _isEditable(commentId: number) {
    const comment = await Comment.findOne({ where: { id: commentId, deletedAt: null }, attributes: ["postId"] });
    const post = await Post.findOne({ where: { id: comment.postId, deletedAt: null }, attributes: ["status"] });
    if (post.status === PostStatus.IN_PROGRESS) {
      return true;
    }
    return false;
  }
}
