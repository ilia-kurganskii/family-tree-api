import { Column, ObjectID } from 'typeorm';
import { AttributionModel } from '@features/family-tree/models';
import { ResourceReferenceEntity } from '@features/family-tree/entities/resource-reference.entity';

export class AttributionEntity implements AttributionModel<ObjectID> {
  @Column(() => ResourceReferenceEntity)
  contributor?: ResourceReferenceEntity;

  @Column()
  modified?: number;

  @Column()
  changeMessage?: string;

  @Column()
  creator?: string;

  @Column()
  created?: number;
}
