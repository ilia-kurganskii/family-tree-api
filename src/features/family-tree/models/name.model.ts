export enum NamePartEnum {
  Given = 'http://gedcomx.org/Given',
  Surname = 'http://gedcomx.org/Surname',
}

export interface NameModel<ID = string> {
  id: ID;

  nameForms: NameFormModel[];
}

export interface NameFormModel {
  fullText: string;

  parts: NamePartModel[];
}

export interface NamePartModel {
  value: string;

  type: NamePartEnum;
}
