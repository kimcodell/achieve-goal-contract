import axiosInstance from '@utils/axios';
import { PostDto, PostSimpleDto } from '@_types/PostDto';

export async function getAllPosts(): Promise<PostSimpleDto[]> {
  const {
    data: { data },
  } = await axiosInstance.get('/v1/post');
  return data;
}

export async function getPostById(params: { postId: number }): Promise<PostDto> {
  const {
    data: { data },
  } = await axiosInstance.get(`/v1/post/${params.postId}`);
  return data;
}
