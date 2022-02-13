import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  token: string;
}
