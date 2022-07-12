import { PostStatus } from './../index';

export default interface SimplePostDto {
  id: number;
  nickname: string;
  title: string;
  distributionTokenAmount: string;
  status: PostStatus;
  createdAt: string;
  // certificationStartDate: string;
  // certificationEndDate: string;
  // certificationCycle: number; // 단위: 일
  // certificationTime: number; // 단위:: 시(시간)
}