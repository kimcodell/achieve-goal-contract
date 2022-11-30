import axiosInstance from '@utils/axios';

const prefix = '/v1/auth';
export async function signup(params: { name: string; nickname: string; email: string; password: string; registerType: number }) {
  try {
    await axiosInstance.post(`${prefix}/signup`, params);
  } catch (error) {
    console.error(error);
    throw error;
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
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('accessToken');
  axiosInstance.defaults.headers.common.Authorization = undefined;
}

export async function checkNickname(params: { nickname: string }): Promise<{ message?: string } | undefined> {
  try {
    const {
      data: { data },
    } = await axiosInstance.post(`${prefix}/check/nickname`, params);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function checkEmail(params: { email: string }): Promise<{ message?: string } | undefined> {
  try {
    const {
      data: { data },
    } = await axiosInstance.post(`${prefix}/check/email`, params);
    return data;
  } catch (error) {
    console.error(error);
  }
}
