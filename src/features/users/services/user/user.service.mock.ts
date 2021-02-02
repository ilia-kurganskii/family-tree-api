import {
  ChangePasswordPayload,
  CreateUserPayload,
  UpdateUserPayload,
} from '@features/users/services/user/user.types';
import { User } from '@features/users/models/user.model';
import { userMock } from '@features/users/models/user.model.mock';

export class UserServiceMock {
  async createUser(data: CreateUserPayload): Promise<User> {
    return Promise.resolve(userMock);
  }

  async findUserById(userId: string): Promise<User> {
    return Promise.resolve(userMock);
  }

  async findUserByEmail(email: string): Promise<User> {
    return Promise.resolve(userMock);
  }

  async updateUser({
    userId,
    ...newUserData
  }: UpdateUserPayload): Promise<User> {
    return Promise.resolve(userMock);
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
    currentPassword,
  }: ChangePasswordPayload) {
    return Promise.resolve(userMock);
  }
}
