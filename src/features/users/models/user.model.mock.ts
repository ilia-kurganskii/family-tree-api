import { UserModel } from '@features/users/models/user.model';
import { ObjectID } from 'mongodb';
import { RoleModel } from '@features/users/models/role.model';

export const blueUser: UserModel = {
  id: new ObjectID(),
  email: 'blue.user@example.com',
  password: '$2b$10$IpRqna2AgfQQNvku9sUNPux7xspmFzfsRSTA0Kec89o1pTyPOC8lu', // blue-password
  firstname: 'Blue',
  lastname: 'User',
  role: RoleModel.USER,
};

export const redUser: UserModel = {
  id: new ObjectID(),
  email: 'red.user@example.com',
  password: '$2b$10$TP8y/wWimJZa0PPhH6Kysu0/CJFFlf1X06cqtKoEmeA9kBgp7dA0e', // red-password
  firstname: 'Red',
  lastname: 'User',
  role: RoleModel.USER,
};
