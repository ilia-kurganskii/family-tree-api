import { AttributionEntity } from '@features/family-tree/entities/attribution.entity';
import { RelationshipEntity } from '@features/family-tree/entities/relationship.entity';
import { Column, Entity, ObjectID } from 'typeorm';
import { PersonEntity } from '@features/family-tree/entities/person.entity';
import { SourceDescriptionEntity } from '@features/family-tree/entities/source-description.entity';
import { AgentEntity } from '@features/family-tree/entities/agent.entity';
import { PlaceDescriptionEntity } from '@features/family-tree/entities/place-description.entity';
import { GedcomModel } from '@features/family-tree/models';

@Entity()
export class GedcomEntity implements GedcomModel<ObjectID> {
  @Column()
  attribution: AttributionEntity;

  @Column(() => PersonEntity)
  persons: PersonEntity[];

  @Column(() => RelationshipEntity)
  relationships: RelationshipEntity[];

  @Column(() => SourceDescriptionEntity)
  sourceDescriptions: SourceDescriptionEntity[];

  @Column(() => AgentEntity)
  agents: AgentEntity[];

  @Column(() => PlaceDescriptionEntity)
  places: PlaceDescriptionEntity[];
}
