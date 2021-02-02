import { User } from '@features/users/models/user.model';
import { Role } from '@features/users/models/role.model';

export const userMock: User = {
  id: '2',
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'ilya.kurganskiy@gmail.com',
  password: 'password',
  firstname: 'Ilya',
  lastname: 'Kurganskiy',
  role: Role.USER,
};
