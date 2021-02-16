import { Injectable, Logger } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import {
  LoginPayload,
  LogoutPayload,
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
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: ApplicationJwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  public async signup({ password, email }: SignupPayload): Promise<Token> {
    this.logger.log('signup');
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
    this.logger.log('login');
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
    this.logger.log('getUserFromToken');
    const tokenPayload = this.jwtService.decodeAccessToken(token);
    if (tokenPayload && tokenPayload.userId) {
      return this.userService.findUserById(tokenPayload.userId);
    }
    return null;
  }

  public async refreshTokens(refreshToken: string): Promise<Token> {
    this.logger.log('refreshTokens');
    try {
      const { userId, databaseId } = await this.jwtService.verifyRefreshToken(
        refreshToken
      );
      return await this.jwtService.refreshTokens({
        userId,
        refreshTokenId: databaseId,
      });
    } catch (e) {
      throw new IncorrectToken(e.message);
    }
  }

  public async logout(payload: LogoutPayload): Promise<void> {
    this.logger.log('logout');
    try {
      const refreshTokenPayload = await this.jwtService.verifyRefreshToken(
        payload.refreshToken
      );
      await this.jwtService.revokeRefreshTokenById(
        refreshTokenPayload.databaseId
      );
    } catch (e) {
      this.logger.warn(e);
    }
  }
}
