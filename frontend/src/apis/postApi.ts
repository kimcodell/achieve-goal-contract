import axiosInstance from '@utils/axios';
import { PostDto, PostSimpleDto } from '@_types/PostDto';

const prefix = '/v1/post';

export const POST_QUERY_KEY = {
  GET_ALL_POSTS: 'getAllPosts',
  GET_POST_BY_ID: 'getPostById',
};

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

export async function createNewPost(params: {
  title: string;
  content: string;
  distributionTokenAmount: string;
  certificationStartDate: string;
  certificationEndDate: string;
  certificationCycle: number;
  certificationTime: number;
}) {
  try {
    await axiosInstance.post(`${prefix}`, params);
  } catch (error) {
    console.log(error);
  }
}
