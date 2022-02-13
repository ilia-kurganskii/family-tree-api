import {
  IncorrectPassword,
  IncorrectUsername,
} from '@features/auth/services/auth/auth.exceptions';
import { AuthService } from '@features/auth/services/auth/auth.service';
import { ApplicationJwtService } from '@features/auth/services/jwt/application-jwt.service';
import { JwtServiceMock } from '@features/auth/services/jwt/jwt.service.mock';
import { PasswordService } from '@features/auth/services/password/password.service';
import { PasswordServiceMock } from '@features/auth/services/password/password.service.mock';
import { blueUser } from '@features/users/models/user.model.mock';
import { UserService } from '@features/users/services/user/user.service';
import { UserServiceMock } from '@features/users/services/user/user.service.mock';
import { Test } from '@nestjs/testing';
import { ObjectID } from 'mongodb';

describe('AuthService', () => {
  let userService: UserService;
  let authService: AuthService;
  let jwtService: ApplicationJwtService;
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
          provide: ApplicationJwtService,
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
    jwtService = moduleRef.get(ApplicationJwtService);
    passwordService = moduleRef.get(PasswordService);
  });

  describe('signup', () => {
    it('should generate token for new user id', async () => {
      const newId = new ObjectID();
      jest.spyOn(userService, 'createUser').mockResolvedValue({
        ...blueUser,
        id: newId,
      });
      jest.spyOn(jwtService, 'generateTokens');

      await authService.signup({
        email: 'email',
        password: 'password',
      });

      expect(jwtService.generateTokens).toHaveBeenCalledWith({
        userId: newId.toString(),
      });
    });
  });

  describe('login', () => {
    it('should generate token for existed user id', async () => {
      const existedId = new ObjectID();
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue({
        ...blueUser,
        id: existedId,
      });
      jest.spyOn(passwordService, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'generateTokens');

      await authService.login({
        email: 'email',
        password: 'password',
      });

      expect(jwtService.generateTokens).toHaveBeenCalledWith({
        userId: existedId.toString(),
      });
    });

    it('should throw error when user not found', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

      await expect(
        authService.login({
          email: 'email',
          password: 'password',
        })
      ).rejects.toThrowError(IncorrectUsername);
    });

    it('should throw error when password is found', async () => {
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(blueUser);
      jest.spyOn(passwordService, 'validatePassword').mockResolvedValue(false);

      await expect(
        authService.login({
          email: 'email',
          password: 'password',
        })
      ).rejects.toThrowError(IncorrectPassword);
    });
  });
});
