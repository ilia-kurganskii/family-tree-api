import { User } from '@features/users/models/user.model';
import { Role } from '@features/users/models/role.model';

export const blueUser: User = {
  id: 'blue-user-id',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'blue.user@example.com',
  password: 'password', // password-blue
  firstname: 'Blue',
  lastname: 'User',
  role: Role.USER,
};

export const redUser: User = {
  id: 'red-user-id',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'red.user@example.com',
  password: 'password', // password-red
  firstname: 'Red',
  lastname: 'User',
  role: Role.USER,
};
