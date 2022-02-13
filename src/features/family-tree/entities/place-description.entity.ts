import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { TextValueEntity } from '@features/family-tree/entities/text-value.entity';
import { PlaceDescriptionModel } from '@features/family-tree/models';

@Entity()
export class PlaceDescriptionEntity implements PlaceDescriptionModel<ObjectID> {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column(() => TextValueEntity)
  names: TextValueEntity[];
}
