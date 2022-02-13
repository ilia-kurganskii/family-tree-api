export enum GenderType {
  Male = 'http://gedcomx.org/Male',
  Female = 'http://gedcomx.org/Female',
  Unknown = 'http://gedcomx.org/Unknown',
  Intersex = 'http://gedcomx.org/Intersex',
}

export interface GenderModel {
  type: GenderType;
}
