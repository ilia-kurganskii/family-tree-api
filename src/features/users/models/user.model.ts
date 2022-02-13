import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { RoleModel } from '@features/users/models/role.model';

@Entity()
export class UserModel {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  role: RoleModel;
}
