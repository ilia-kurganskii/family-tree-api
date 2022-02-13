import { RoleModel } from '@features/users/models/role.model';
import {
  UserAlreadyExists,
  UserPasswordDoesNotMatch,
} from '@features/users/services/user/user.exceptions';
import {
  ChangePasswordPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from '@features/users/services/user/user.types';
import { Injectable, Logger } from '@nestjs/common';
import { PasswordService } from '@features/auth/services/password/password.service';
import { UserModel } from '@features/users/models/user.model';
import { MongoError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isMongoErrorWithCode } from '@features/common/utils/errors';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
    private passwordService: PasswordService
  ) {}

  async createUser(data: CreateUserPayload): Promise<UserModel> {
    this.logger.log('createUser');
    try {
      return await this.usersRepository.save({
        ...data,
        role: RoleModel.USER,
      });
    } catch (e) {
      if (isMongoErrorWithCode(e, 11000)) {
        throw new UserAlreadyExists(`Email ${data.email} already used.`);
      } else {
        this.logger.error(e);
        throw e;
      }
    }
  }

  async findUserById(userId: string): Promise<UserModel> {
    this.logger.log('findUserById');
    return this.usersRepository.findOne(userId);
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    this.logger.log('findUserByEmail');
    return await this.usersRepository.findOne({ email });
  }

  async updateUser(payload: UpdateUserPayload): Promise<UserModel> {
    this.logger.log('updateUser');
    const { userId, ...newUserData } = payload;
    return this.usersRepository.save({ id: userId, ...newUserData });
  }

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    this.logger.log('changePassword');
    const { userId, oldPassword, newPassword, currentPassword } = payload;
    const passwordValid = await this.passwordService.validatePassword(
      oldPassword,
      currentPassword
    );

    if (!passwordValid) {
      throw new UserPasswordDoesNotMatch('Passwords do not match');
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    await this.usersRepository.save({
      id: userId,
      password: hashedPassword,
    });
  }
}
