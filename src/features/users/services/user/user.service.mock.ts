import { User } from '@features/users/models/user.model';
import { blueUser } from '@features/users/models/user.model.mock';
import {
  ChangePasswordPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from '@features/users/services/user/user.types';

export class UserServiceMock {
  async createUser(data: CreateUserPayload): Promise<User> {
    return Promise.resolve(blueUser);
  }

  async findUserById(userId: string): Promise<User> {
    return Promise.resolve(blueUser);
  }

  async findUserByEmail(email: string): Promise<User> {
    return Promise.resolve(blueUser);
  }

  async updateUser({
    userId,
    ...newUserData
  }: UpdateUserPayload): Promise<User> {
    return Promise.resolve(blueUser);
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
    currentPassword,
  }: ChangePasswordPayload) {
    return Promise.resolve(blueUser);
  }
}
