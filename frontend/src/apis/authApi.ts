import axiosInstance from '@utils/axios';

const prefix = '/v1/auth';
export async function signup(params: { name: string; nickname: string; email: string; password: string; registerType: number }) {
  try {
    await axiosInstance.post(`${prefix}/signup`, params);
  } catch (error) {
    console.log(error);
  }
}

export async function login(params: { email: string; password: string }): Promise<string | undefined> {
  try {
    const {
      data: {
        data: { jwt },
      },
    } = await axiosInstance.post(`${prefix}/email`, params);
    localStorage.setItem('accessToken', jwt);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    return jwt;
  } catch (error) {
    console.error(error);
  }
}
