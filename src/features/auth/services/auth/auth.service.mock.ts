import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import { Token } from '@features/auth/models/token.model';
import { User } from '@features/users/models/user.model';

export class AuthServiceMock implements IAuthService {
  createUser(): Promise<Token> {
    return Promise.resolve(undefined);
  }

  // @ts-ignore
  getUserFromToken(token: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  login(email: string, password: string): Promise<Token> {
    return Promise.resolve(undefined);
  }

  refreshToken(token: string): Token {
    return undefined;
  }

  // @ts-ignore
  validateUser(userId: string): Promise<User> {
    return Promise.resolve(undefined);
  }
}
