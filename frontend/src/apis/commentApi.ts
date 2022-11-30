import axiosInstance from '@utils/axios';

const prefix = '/v1/comment';

export async function createComment(params: { postId: number; comment: string }) {
  try {
    await axiosInstance.post(`${prefix}`, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
