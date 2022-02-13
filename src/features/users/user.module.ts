import { CommonModule } from '@features/common/common.module';
import { Module } from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { PasswordService } from '../auth/services/password/password.service';
import { UserModel } from '@features/users/models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), CommonModule],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
