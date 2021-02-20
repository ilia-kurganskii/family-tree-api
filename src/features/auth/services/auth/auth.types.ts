import { Token } from '@features/auth/models/token.model';
import { User } from '@features/users/models/user.model';

export interface SignupPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {
  refreshToken?: string;
}

export interface LoggedUserWithTokens {
  token: Token;
  user: User;
}
