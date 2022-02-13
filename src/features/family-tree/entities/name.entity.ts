import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import {
  NameFormModel,
  NameModel,
  NamePartEnum,
  NamePartModel,
} from '@features/family-tree/models';

@Entity()
export class NameEntity implements NameModel<ObjectID> {
  @ObjectIdColumn()
  id: ObjectID;

  @Column(() => NameFormEntity)
  nameForms: NameFormEntity[];
}

export class NameFormEntity implements NameFormModel {
  @Column()
  fullText: string;

  @Column(() => NamePart)
  parts: NamePart[];
}

export class NamePart implements NamePartModel {
  @Column()
  value: string;

  @Column()
  type: NamePartEnum;
}
