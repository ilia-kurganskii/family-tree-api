import { Column, Entity } from 'typeorm';
import { AgentModel } from '@features/family-tree/models';
import { TextValueEntity } from '@features/family-tree/entities/text-value.entity';

@Entity()
export class AgentEntity implements AgentModel {
  @Column(() => TextValueEntity)
  names: TextValueEntity[];
}
