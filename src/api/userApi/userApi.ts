import { instance } from '../index';

type AuthPropsType = {
  email: string;
  password: string;
};

export const userApi = {
  signIn: async ({ email, password }: AuthPropsType): Promise<UserType> => {
    const response = await instance.post('users/login', { email, password });
    return { email, id: response.data } as UserType;
  },
  signUp: async ({ email, password }: AuthPropsType): Promise<UserType> => {
    const response = await instance.post('users/login', { email, password });
    return { email, id: response.data } as UserType;
  },
};
