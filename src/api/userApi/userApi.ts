import { instance } from '../index';

type AuthPropsType = {
  email: string;
  password: string;
};

export const userApi = {
  signIn: async (params: AuthPropsType): Promise<UserType> => {
    const response = await instance.post(
      'http://moviesapp-env.eba-ye28mqew.us-east-1.elasticbeanstalk.com/users/login',
      {
        email: 'test@gmail.com',
        password: 'test',
      },
    );
    console.log('SIGN IN:', response);
    return {
      email: 'test@gmail.com',
      id: 1,
    } as UserType;
  },
  signUp: async (params: AuthPropsType): Promise<UserType> => {
    const response = await instance.get('/elastic', { params });
    return response.data.data.items.materials as UserType;
  },
};
