import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';
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
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async createUser(data: CreateUserPayload): Promise<User> {
    this.logger.log('createUser');
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          role: Role.USER,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new UserAlreadyExists(`Email ${data.email} already used.`);
      } else {
        this.logger.error(e);
        throw e;
      }
    }
  }

  async findUserById(userId: string): Promise<User> {
    this.logger.log('findUserById');
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findUserByEmail(email: string): Promise<User> {
    this.logger.log('findUserByEmail');
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(payload: UpdateUserPayload): Promise<User> {
    this.logger.log('updateUser');
    const { userId, ...newUserData } = payload;
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(payload: ChangePasswordPayload) {
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

    return this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
