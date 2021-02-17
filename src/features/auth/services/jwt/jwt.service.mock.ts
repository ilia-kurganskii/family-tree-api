import { JwtAccessModel } from '@features/auth/models/jwt-access.model';
import { Token } from '@features/auth/models/token.model';
import { JwtRefreshModel } from '@features/auth/models/jwt-refresh.model';

export class JwtServiceMock {
  decodeAccessToken(accessToken: string): JwtAccessModel {
    return {
      userId: '1',
    };
  }

  verifyRefreshToken(refreshToken: string): JwtRefreshModel {
    return {
      userId: '1',
      databaseId: '2',
    };
  }

  generateTokens(payload: JwtAccessModel): Token {
    return {
      accessToken: 'access',
      expiresIn: 95000,
      refreshToken: 'refresh',
    };
  }
}
