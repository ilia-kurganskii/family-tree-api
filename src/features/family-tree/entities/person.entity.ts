import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { NameEntity } from '@features/family-tree/entities/name.entity';
import { GenderEntity } from '@features/family-tree/entities/gender.entity';
import { FactEntity } from '@features/family-tree/entities/fact.entity';
import { SourceReferenceEntity } from '@features/family-tree/entities/source-reference.entity';
import { PersonModel } from '@features/family-tree/models';

@Entity()
export class PersonEntity implements PersonModel<ObjectID> {
  @ObjectIdColumn()
  id: ObjectID;

  @Column(() => NameEntity)
  names: NameEntity[];

  @Column(() => GenderEntity)
  gender: GenderEntity;

  @Column(() => FactEntity)
  facts: FactEntity[];

  @Column(() => SourceReferenceEntity)
  sources: SourceReferenceEntity[];
}
