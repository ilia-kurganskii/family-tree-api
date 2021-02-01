import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import { Token } from '@features/auth/models/token.model';
import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';

export class AuthServiceMock implements IAuthService {
  createUser(payload: SignupPayload): Promise<Token> {
    return Promise.resolve({
      accessToken: '',
      refreshToken: '',
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
    });
  }

  refreshToken(token: string): Token {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }

  validateUser(userId: string): Promise<User> {
    return Promise.resolve({
      id: userId,
      email: 'mock@gmail.com',
      firstname: 'Mock',
      lastname: 'User',
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'password',
    });
  }
}
