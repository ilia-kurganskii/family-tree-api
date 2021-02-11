import { Token } from '@features/auth/models/token.model';
import { AuthService } from '@features/auth/services/auth/auth.service';
import { AuthServiceMock } from '@features/auth/services/auth/auth.service.mock';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compile();

    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe('signup', () => {
    it('should return tokens', async () => {
      const tokens: Token = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
      jest.spyOn(authService, 'signup').mockResolvedValue(tokens);

      expect(
        await authController.signup({ email: 'log', password: 'pass' })
      ).toEqual(tokens);
    });
  });

  it('should return tokens', async () => {
    const tokens: Token = {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    };
    jest.spyOn(authService, 'refreshTokens').mockReturnValue(tokens);

    expect(await authController.refreshToken('accessToken')).toEqual(tokens);
  });
});
