import { Test } from '@nestjs/testing';
import { UserService } from '@features/users/services/user/user.service';
import { PasswordService } from '@features/auth/services/password/password.service';
import { PasswordServiceMock } from '@features/auth/services/password/password.service.mock';
import { userMock } from '@features/users/models/user.model.mock';
import { AuthService } from '@features/auth/services/auth/auth.service';
import { UserServiceMock } from '@features/users/services/user/user.service.mock';
import { JwtService } from '@features/auth/services/jwt/jwt.service';
import { JwtServiceMock } from '@features/auth/services/jwt/jwt.service.mock';

describe('AuthService', () => {
  let userService: UserService;
  let authService: AuthService;
  let jwtService: JwtService;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        {
          provide: PasswordService,
          useClass: PasswordServiceMock,
        },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    userService = moduleRef.get(UserService);
    jwtService = moduleRef.get(JwtService);
    passwordService = moduleRef.get(PasswordService);
  });

  describe('signup', () => {
    it('should generate token for new user id', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue({
        ...userMock,
        id: 'newId',
      });
      jest.spyOn(jwtService, 'generateTokens');

      await authService.signup({
        email: 'email',
        password: 'password',
      });

      expect(jwtService.generateTokens).toHaveBeenCalledWith({
        userId: 'newId',
      });
    });
  });
});
