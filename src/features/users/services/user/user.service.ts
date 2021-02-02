import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from '../../../auth/services/password/password.service';
import { PrismaService } from '../../../common/services/prisma/prisma.service';
import {
  ChangePasswordPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from '@features/users/services/user/user.types';
import { User } from '@features/users/models/user.model';
import { Role } from '@features/users/models/role.model';
import { PrismaClientKnownRequestError } from '@prisma/client';
import {
  UserAlreadyExists,
  UserPasswordDoesNotMatch,
} from '@features/users/services/user/user.exceptions';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async createUser(data: CreateUserPayload): Promise<User> {
    try {
      return this.prisma.user.create({
        data: {
          ...data,
          role: Role.USER,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new UserAlreadyExists(`Email ${data.email} already used.`);
      } else {
        throw e;
      }
    }
  }

  async findUserById(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser({
    userId,
    ...newUserData
  }: UpdateUserPayload): Promise<User> {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
    currentPassword,
  }: ChangePasswordPayload) {
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
