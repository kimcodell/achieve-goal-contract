import { PostStatus } from "./types";

export interface PostSimpleDto {
  postId: number;
  userId: number;
  title: string;
  distributionTokenAmount: string;
  status: number;
  createdAt: string;
  nickname: string;
}

export interface PostDto {
  postId: number;
  userId: number;
  nickname: string;
  title: string;
  content: string;
  distributionTokenAmount: string;
  certificationStartDate: string;
  certificationEndDate: string;
  certificationCycle: number;
  certificationTime: number;
  status: PostStatus,
  createdAt: string;
  comments: [
      {
          id: number;
          userId: number;
          comment: string;
          createdAt: string;
          nickname: string;
      },
      {
          id: number;
          userId: number;
          comment: string;
          createdAt: string;
          nickname: string;
      }
  ],
  certiPosts: [
      {
          id: number;
          comment: string;
          imageUrl: string;
          createdAt: string;
      },
      {
          id: number;
          comment: string;
          imageUrl: string;
          createdAt: string;
      },
      {
          id: number;
          comment: string;
          imageUrl: string;
          createdAt: string;
      }
  ]
}
