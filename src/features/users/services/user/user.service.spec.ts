import { Test } from '@nestjs/testing';
import { UserService } from '@features/users/services/user/user.service';
import { PasswordService } from '@features/auth/services/password/password.service';
import { PasswordServiceMock } from '@features/auth/services/password/password.service.mock';
import { UserPasswordDoesNotMatch } from '@features/users/services/user/user.exceptions';
import { Repository } from 'typeorm';
import { UserModel } from '@features/users/models/user.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import Mock = jest.Mock;
import { repositoryMockFactory } from '@features/common/mocks/repository-mock';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserModel>;
  let passwordService: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserModel),
          useFactory: repositoryMockFactory,
        },
        {
          provide: PasswordService,
          useClass: PasswordServiceMock,
        },
      ],
    }).compile();

    userService = moduleRef.get(UserService);
    userRepository = moduleRef.get<Repository<UserModel>>(
      getRepositoryToken(UserModel)
    );
    passwordService = moduleRef.get(PasswordService);
  });

  describe('changePassword', () => {
    it('should change password (Positive)', async () => {
      jest.spyOn(userRepository, 'save');
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

      expect(userRepository.save).toHaveBeenCalledWith({
        password: 'newHashPassword',
        id: '1',
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
