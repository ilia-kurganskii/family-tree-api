import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import { JwtAccessModel } from '@features/auth/models/jwt-access.model';
import { JwtRefreshModel } from '@features/auth/models/jwt-refresh.model';
import { Token } from '@features/auth/models/token.model';
import {
  GenerateTokenPayload,
  RefreshTokenPayload,
} from '@features/auth/services/jwt/jwt.service.types';
import { RefreshTokenService } from '@features/auth/services/refresh-token/refresh-token.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class ApplicationJwtService {
  private readonly logger = new Logger(ApplicationJwtService.name);

  constructor(
    private readonly nestJwt: NestJwtService,
    private readonly configService: ConfigService<ConfigurationVariables>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public decodeAccessToken(accessToken: string): JwtAccessModel {
    this.logger.log('decodeAccessToken');
    return this.nestJwt.decode(accessToken) as JwtAccessModel;
  }

  public verifyAccessToken(accessToken: string): JwtAccessModel {
    this.logger.log('verifyAccessToken');
    return this.nestJwt.verify<JwtAccessModel>(accessToken);
  }

  public async verifyRefreshToken(
    refreshToken: string
  ): Promise<JwtRefreshModel> {
    this.logger.log('verifyRefreshToken ' + refreshToken);
    const refreshPayload = this.nestJwt.verify<JwtRefreshModel>(refreshToken);
    const tokenExist = await this.refreshTokenService.isRefreshTokenExist({
      tokenId: refreshPayload.databaseId,
      userId: refreshPayload.userId,
    });
    if (!tokenExist) {
      throw new Error('Refresh token is not exist');
    }
    return refreshPayload;
  }

  public async generateTokens(payload: GenerateTokenPayload): Promise<Token> {
    this.logger.log('generateTokens');
    const accessToken = this.signAccessToken(payload);

    const refreshTokenEntity = await this.refreshTokenService.createRefreshToken(
      {
        userId: payload.userId,
      }
    );

    const refreshToken = this.signRefreshToken({
      userId: payload.userId,
      databaseId: refreshTokenEntity.id.toString(),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: this.configService.get<SecurityConfig>('security')?.expiresIn,
    };
  }

  public async refreshTokens(payload: RefreshTokenPayload): Promise<Token> {
    this.logger.log('refreshTokens');
    const refreshTokenEntity = await this.refreshTokenService.recreateRefreshToken(
      {
        tokenId: payload.refreshTokenId,
        userId: payload.userId,
      }
    );

    const accessToken = this.signAccessToken({
      userId: payload.userId,
    });

    const refreshToken = this.signRefreshToken({
      userId: payload.userId,
      databaseId: refreshTokenEntity.id.toString(),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: this.configService.get<SecurityConfig>('security')?.expiresIn,
    };
  }

  public async revokeRefreshTokenById(tokenId: string): Promise<void> {
    this.logger.log('revokeRefreshTokenById');
    await this.refreshTokenService.removeRefreshToken({
      tokenId,
    });
  }

  private signAccessToken(payload: JwtAccessModel) {
    this.logger.log('signAccessToken');
    const securityConfig = this.configService.get<SecurityConfig>('security');

    return this.nestJwt.sign(
      {
        userId: payload.userId,
      },
      {
        expiresIn: securityConfig?.expiresIn,
      }
    );
  }

  private signRefreshToken(payload: JwtRefreshModel) {
    this.logger.log('signRefreshToken');

    return this.nestJwt.sign(payload, {
      jwtid: String(payload.databaseId),
    });
  }
}
