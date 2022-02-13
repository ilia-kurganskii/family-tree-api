import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { GedcomDateEntity } from '@features/family-tree/entities/gedcom-date.entity';
import { PlaceReferenceEntity } from '@features/family-tree/entities/place-reference.entity';
import { FactModel, FactType } from '@features/family-tree/models';

@Entity()
export class FactEntity implements FactModel<ObjectID> {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  type: FactType;

  @Column(() => GedcomDateEntity)
  date: GedcomDateEntity;

  @Column(() => PlaceReferenceEntity)
  place: PlaceReferenceEntity;
}
