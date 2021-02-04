import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Token } from '@features/auth/models/token.model';
import { User } from '@features/users/models/user.model';
import { ApplicationJwtService } from '@features/auth/services/jwt/application-jwt.service';
import { UserService } from '@features/users/services/user/user.service';
import {
  IncorrectPassword,
  IncorrectToken,
  IncorrectUsername,
} from '@features/auth/services/auth/auth.exceptions';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: ApplicationJwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  public async signup({ password, email }: SignupPayload): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(password);

    const user = await this.userService.createUser({
      email: email,
      password: hashedPassword,
    });

    return this.jwtService.generateTokens({
      userId: user.id,
    });
  }

  public async login({ email, password }: LoginPayload): Promise<Token> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new IncorrectUsername(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new IncorrectPassword('Invalid password');
    }

    return this.jwtService.generateTokens({
      userId: user.id,
    });
  }

  public getUserFromToken(token: string): Promise<User> {
    const tokenPayload = this.jwtService.decodeAccessToken(token);
    if (tokenPayload && tokenPayload.userId) {
      return this.userService.findUserById(tokenPayload.userId);
    }
    return null;
  }

  public refreshTokens(refreshToken: string): Token {
    try {
      const { userId } = this.jwtService.verifyRefreshToken(refreshToken);
      return this.jwtService.generateTokens({
        userId,
      });
    } catch (e) {
      throw new IncorrectToken();
    }
  }
}
