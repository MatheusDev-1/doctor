import { useMutation } from '@tanstack/react-query';
import api from '..';
import Cookies from 'js-cookie';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

interface ICredentials {
  email: string;
  password: string;
}

interface ExtendedJWT extends JwtPayload {
  user: Record<string, string>;
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
    const decoded: ExtendedJWT = jwt.decode(data.access);

    if (decoded) {
      const user = decoded.user;

      Cookies.set('accessToken', data.access, { expires: decoded.exp });
      Cookies.set('user', JSON.stringify(user), { expires: decoded.exp });
    }

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
