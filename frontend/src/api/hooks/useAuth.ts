import { useMutation } from '@tanstack/react-query';
import api from '..';
import Cookies from 'js-cookie';

interface ICredentials {
  email: string;
  password: string;
}

interface SigninResponse {
  access: string;
  refresh: string;
  user: Record<string, string>;
}

const signin = async (credentials: ICredentials) => {
  try {
    const response = await api.post('/auth/signin/', credentials);
    const data: SigninResponse = response.data;

    Cookies.set('accessToken', data.access, { expires: 1, secure: true });
    Cookies.set('user', JSON.stringify(data.user), { expires: 1, secure: true });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const useSigninMutation = (options = {}) => {
  return useMutation({
    mutationFn: signin,
    ...options,
  });
};
