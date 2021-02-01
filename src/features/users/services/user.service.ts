import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '../../auth/services/password.service';
import { PrismaService } from '../../common/services/prisma.service';
import {
  ChangePasswordPayload,
  UpdateUserPayload,
} from '@features/users/services/user.types';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  updateUser({ userId, ...newUserData }: UpdateUserPayload) {
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
      throw new BadRequestException('Invalid password');
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
