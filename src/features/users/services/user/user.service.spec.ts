import { Test } from '@nestjs/testing';
import { UserService } from '@features/users/services/user/user.service';
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { PrismaServiceMock } from '@features/common/services/prisma/prisma.service.mock';
import { PasswordService } from '@features/auth/services/password/password.service';
import { PasswordServiceMock } from '@features/auth/services/password/password.service.mock';
import { UserPasswordDoesNotMatch } from '@features/users/services/user/user.exceptions';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
        {
          provide: PasswordService,
          useClass: PasswordServiceMock,
        },
      ],
    }).compile();

    userService = moduleRef.get(UserService);
    prismaService = moduleRef.get(PrismaService);
    passwordService = moduleRef.get(PasswordService);
  });

  describe('changePassword', () => {
    it('should change password (Positive)', async () => {
      jest.spyOn(prismaService.user, 'update');
      jest.spyOn(passwordService, 'validatePassword').mockResolvedValue(true);
      jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue('newHashPassword');

      await userService.changePassword({
        userId: '1',
        newPassword: 'test1',
        oldPassword: 'test2',
        currentPassword: 'oldPassword',
      });

      expect(prismaService.user.update).toHaveBeenCalledWith({
        data: {
          password: 'newHashPassword',
        },
        where: { id: '1' },
      });
    });

    it('should throw UserPasswordDoesNotMatch', async () => {
      jest.spyOn(passwordService, 'validatePassword').mockResolvedValue(false);

      await expect(
        userService.changePassword({
          userId: '1',
          newPassword: 'test1',
          oldPassword: 'test2',
          currentPassword: 'oldPassword',
        })
      ).rejects.toThrowError(UserPasswordDoesNotMatch);
    });
  });
});
