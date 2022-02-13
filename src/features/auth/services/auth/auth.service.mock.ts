import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import { Token } from '@features/auth/models/token.model';
import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { RoleModel } from '@features/users/models/role.model';
import { UserModel } from '@features/users/models/user.model';
import { ObjectID } from 'typeorm';

export class AuthServiceMock implements IAuthService {
  signup(payload: SignupPayload): Promise<Token> {
    return Promise.resolve({
      accessToken: '',
      refreshToken: '',
      expiresIn: 10,
    });
  }

  // @ts-ignore
  getUserFromToken(token: string): Promise<UserModel> {
    return Promise.resolve({
      id: new ObjectID('0'),
      email: 'mock@gmail.com',
      firstname: 'Mock',
      lastname: 'User',
      role: RoleModel.USER,
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
