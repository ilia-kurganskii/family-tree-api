import { CommonModule } from '@features/common/common.module';
import { ProfileResolver } from './resolvers/profile.resolver';
import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { PasswordService } from '../auth/services/password/password.service';

@Module({
  imports: [CommonModule],
  providers: [ProfileResolver, UserService, PasswordService],
})
export class UserModule {}
