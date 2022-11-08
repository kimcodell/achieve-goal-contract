import axiosInstance from '@utils/axios';
import { UserDto } from '@_types/UserDto';

const prefix = '/v1/user';

export const USER_QUERY_KEY = {
  GET_MY_INFO: 'getMyInfo',
  GET_USER_INFO_BY_USER_ID: 'getUserInfoByUserId',
};

export async function getMyInfo(): Promise<UserDto> {
  const {
    data: { data },
  } = await axiosInstance.get(`${prefix}/me`);
  return data;
}

export async function getUserInfo(params: { userId: number }): Promise<UserDto> {
  const {
    data: { data },
  } = await axiosInstance.get(`${prefix}/${params.userId}`);
  return data;
}
