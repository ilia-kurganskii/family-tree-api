import { JwtAccessPayload } from '@features/auth/models/jwt-access.model';
import { Token } from '@features/auth/models/token.model';
import { JwtRefreshModel } from '@features/auth/models/jwt-refresh.model';

export class JwtServiceMock {
  decodeAccessToken(accessToken: string): JwtAccessPayload {
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

  generateTokens(payload: JwtAccessPayload): Token {
    return {
      accessToken: 'access',
      refreshToken: 'refresh',
    };
  }
}
