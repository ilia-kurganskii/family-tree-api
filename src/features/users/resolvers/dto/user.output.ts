import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class UserOutput extends User {
  email: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  @HideField()
  password: string;
}
