import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Token } from '@features/auth/models/token.model';
import { UserModel } from '@features/users/models/user.model';

export interface IAuthService {
  signup(payload: SignupPayload): Promise<Token>;
  login(payload: LoginPayload): Promise<Token>;
  getUserFromToken(token: string): Promise<UserModel | null>;
  refreshTokens(token: string): Promise<Token>;
}
