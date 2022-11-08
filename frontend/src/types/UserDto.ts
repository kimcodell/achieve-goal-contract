import { PostSimpleDto } from './PostDto';

export interface UserDto {
  userId: number;
  nickname?: string;
  walletAddress?: string;
  createdAt: string;
  posts: PostSimpleDto[];
  comments: PostSimpleDto[];
}
