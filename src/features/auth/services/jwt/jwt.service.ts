import { JwtService as NestJwtService } from '@nestjs/jwt';
import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import { ConfigService } from '@nestjs/config';
import { JwtAccessPayload } from '@features/auth/models/jwt-access.model';
import { Token } from '@features/auth/models/token.model';
import { Injectable } from '@nestjs/common';
import { JwtRefreshModel } from '@features/auth/models/jwt-refresh.model';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwt: NestJwtService,
    private readonly configService: ConfigService<ConfigurationVariables>
  ) {}

  decodeAccessToken(accessToken: string): JwtAccessPayload {
    return this.nestJwt.decode(accessToken) as JwtAccessPayload;
  }

  verifyRefreshToken(refreshToken: string): JwtRefreshModel {
    return this.nestJwt.verify<JwtRefreshModel>(refreshToken);
  }

  generateTokens(payload: JwtAccessPayload): Token {
    const securityConfig = this.configService.get<SecurityConfig>('security');

    const accessToken = this.nestJwt.sign(payload, {
      expiresIn: securityConfig?.expiresIn,
    });

    const refreshToken = this.nestJwt.sign(payload, {
      expiresIn: securityConfig?.refreshIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
