import axiosInstance from '@utils/axios';
import { PostDto, PostSimpleDto } from '@_types/PostDto';

const prefix = '/v1/post';

export const POST_QUERY_KEY = {
  GET_ALL_POSTS: 'getAllPosts',
  GET_POST_BY_ID: 'getPostById',
};

export async function getAllPosts(): Promise<PostSimpleDto[]> {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(`${prefix}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPostById(params: { postId: number }): Promise<PostDto> {
  try {
    const {
      data: { data },
    } = await axiosInstance.get(`${prefix}/${params.postId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
    throw error;
  }
}
