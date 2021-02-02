import { ProfileResolver } from './resolvers/profile.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { PasswordService } from '../auth/services/password/password.service';

@Module({
  providers: [ProfileResolver, UserService, PasswordService, PrismaService],
})
export class UserModule {}
