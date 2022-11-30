import axiosInstance from '@utils/axios';
import { CertiPostDto } from '@_types/CertiPostDto';

const prefix = '/v1/certi';

export async function getAllCertiPosts(params: { postId: number }): Promise<CertiPostDto[]> {
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

export async function createCertiPost(params: { postId: number; iamgeUrl: string; comment: string }) {
  try {
    await axiosInstance.post(`${prefix}`, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
