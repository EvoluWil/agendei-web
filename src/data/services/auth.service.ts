import { User } from '../models/user.model';
import { api } from './api';

type SignInRequestProps = {
  user: User;
  token: string;
};

class AuthServiceClass {
  async signIn(email: string, password: string) {
    const { data } = await api.post<SignInRequestProps>('/auth/sign-in', {
      email,
      password
    });
    return data;
  }

  async getMe(token: string) {
    const { data } = await api.get<User>('/auth/get-me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  }

  /*   async updatePassword(
    { password, passwordConfirmation, oldPassword }: FieldValues,
    userId: string
  ) {
    await api.put(`/auth/update-password/${userId}`, {
      password,
      passwordConfirmation,
      oldPassword
    });
  }
 */
  async resetPassword(userId: string) {
    await api.put(`/auth/reset-password/${userId}`);
  }
}

export const AuthService = new AuthServiceClass();
