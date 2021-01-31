import { User } from '@prisma/client';
import { Token } from '../../models/token.model';
import { SignupPayload } from '@features/auth/services/auth/dto/input/signup.payload';

export interface IAuthService {
  createUser(payload: SignupPayload): Promise<Token>;
  login(email: string, password: string): Promise<Token>;
  validateUser(userId: string): Promise<User>;
  getUserFromToken(token: string): Promise<User>;
  refreshToken(token: string): Token;
}
