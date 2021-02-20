import { Token } from '@features/auth/models/token.model';
import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';

export class AuthServiceMock {
  signup(payload: SignupPayload): Promise<Token> {
    return Promise.resolve({
      accessToken: '',
      refreshToken: '',
      expiresIn: 10,
    });
  }

  // @ts-ignore
  getUserFromToken(token: string): Promise<User> {
    return Promise.resolve({
      id: '0',
      email: 'mock@gmail.com',
      firstname: 'Mock',
      lastname: 'User',
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'password',
    });
  }

  login(payload: LoginPayload): Promise<Token> {
    return Promise.resolve({
      accessToken: '',
      refreshToken: '',
      expiresIn: 10,
    });
  }

  refreshTokens(token: string): Promise<Token> {
    return Promise.resolve({
      accessToken: '',
      refreshToken: '',
      expiresIn: 10,
    });
  }
}
