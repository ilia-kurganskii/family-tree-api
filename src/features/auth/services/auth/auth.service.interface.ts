import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Token } from '@features/auth/models/token.model';
import { User } from '@features/users/models/user.model';

export interface IAuthService {
  createUser(payload: SignupPayload): Promise<Token>;
  login(payload: LoginPayload): Promise<Token>;
  validateUser(userId: string): Promise<User>;
  getUserFromToken(token: string): Promise<User | null>;
  refreshToken(token: string): Token;
}
