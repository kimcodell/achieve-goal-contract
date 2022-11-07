import axiosInstance from '@utils/axios';
import { PostDto, PostSimpleDto } from '@_types/PostDto';

const prefix = '/v1/post';

export async function getAllPosts(): Promise<PostSimpleDto[]> {
  const {
    data: { data },
  } = await axiosInstance.get(`${prefix}`);
  return data;
}

export async function getPostById(params: { postId: number }): Promise<PostDto> {
  const {
    data: { data },
  } = await axiosInstance.get(`${prefix}/${params.postId}`);
  return data;
}
