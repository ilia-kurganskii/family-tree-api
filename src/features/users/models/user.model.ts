import { Role } from '@features/users/models/role.model';
import { BaseModel } from '@features/common/models/base.model';

export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  password: string;
}
