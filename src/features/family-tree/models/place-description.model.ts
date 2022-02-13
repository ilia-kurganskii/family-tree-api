import { TextValueModel } from '@features/family-tree/models/text-value.model';

export interface PlaceDescriptionModel<ID = string> {
  id: ID;

  latitude: number;

  longitude: number;

  names: TextValueModel[];
}
