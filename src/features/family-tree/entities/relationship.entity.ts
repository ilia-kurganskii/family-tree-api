import { ResourceReferenceEntity } from '@features/family-tree/entities/resource-reference.entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { FactEntity } from '@features/family-tree/entities/fact.entity';
import { SourceReferenceEntity } from '@features/family-tree/entities/source-reference.entity';
import {
  RelationshipCouple,
  RelationshipModel,
} from '@features/family-tree/models';

@Entity()
export class RelationshipEntity implements RelationshipModel<ObjectID> {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  type?: RelationshipCouple;

  @Column(() => ResourceReferenceEntity)
  person1: ResourceReferenceEntity;

  @Column(() => ResourceReferenceEntity)
  person2: ResourceReferenceEntity;

  @Column(() => FactEntity)
  facts: FactEntity[];

  @Column(() => SourceReferenceEntity)
  sources: SourceReferenceEntity[];
}
