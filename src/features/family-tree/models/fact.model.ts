import { GedcomDateModel } from '@features/family-tree/models/gedcom-date.model';
import { PlaceReferenceModel } from '@features/family-tree/models/place-reference.model';

export enum FactType {
  Adoption = 'http://gedcomx.org/Adoption',
  Birth = 'http://gedcomx.org/Birth',
  Burial = 'http://gedcomx.org/Burial',
  Christening = 'http://gedcomx.org/Christening',
  Death = 'http://gedcomx.org/Death',
  Residence = 'http://gedcomx.org/Residence',
  Divorce = 'http://gedcomx.org/Divorce',
  Marriage = 'http://gedcomx.org/Marriage',
}

export interface FactModel<ID = string> {
  id: ID;

  type: FactType;

  date: GedcomDateModel;

  place: PlaceReferenceModel<ID>;
}
