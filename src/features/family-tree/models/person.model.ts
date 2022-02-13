import { NameModel } from '@features/family-tree/models/name.model';
import { GenderModel } from '@features/family-tree/models/gender.model';
import { FactModel } from '@features/family-tree/models/fact.model';
import { SourceReferenceModel } from '@features/family-tree/models/source-reference.model';

export interface PersonModel<ID = string> {
  id: ID;

  names: NameModel<ID>[];

  gender: GenderModel;

  facts: FactModel<ID>[];

  sources: SourceReferenceModel<ID>[];
}
