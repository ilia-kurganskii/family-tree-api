import {
  AgentModel,
  AttributionModel,
  PersonModel,
  PlaceDescriptionModel,
  RelationshipModel,
  SourceDescriptionModel,
} from '@features/family-tree/models';

export interface GedcomModel<ID = string> {
  attribution: AttributionModel<ID>;

  persons: PersonModel<ID>[];

  relationships: RelationshipModel<ID>[];

  sourceDescriptions: SourceDescriptionModel[];

  agents: AgentModel[];

  places: PlaceDescriptionModel<ID>[];
}
