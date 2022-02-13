import { ResourceReferenceEntity } from '@features/family-tree/entities/resource-reference.entity';
import { FactEntity } from '@features/family-tree/entities/fact.entity';
import { SourceReferenceEntity } from '@features/family-tree/entities/source-reference.entity';

export enum RelationshipCouple {
  Couple = 'http://gedcomx.org/Couple',
}

export class RelationshipModel<ID = string> {
  id: ID;

  type?: RelationshipCouple;

  person1: ResourceReferenceEntity;

  person2: ResourceReferenceEntity;

  facts: FactEntity[];

  sources: SourceReferenceEntity[];
}
