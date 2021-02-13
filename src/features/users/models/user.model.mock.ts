import { User } from '@features/users/models/user.model';
import { Role } from '@features/users/models/role.model';

export const blueUser: User = {
  id: 'blue-user-id',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'blue.user@example.com',
  password: '$2b$10$IpRqna2AgfQQNvku9sUNPux7xspmFzfsRSTA0Kec89o1pTyPOC8lu', // blue-password
  firstname: 'Blue',
  lastname: 'User',
  role: Role.USER,
};

export const redUser: User = {
  id: 'red-user-id',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'red.user@example.com',
  password: '$2b$10$TP8y/wWimJZa0PPhH6Kysu0/CJFFlf1X06cqtKoEmeA9kBgp7dA0e', // red-password
  firstname: 'Red',
  lastname: 'User',
  role: Role.USER,
};
