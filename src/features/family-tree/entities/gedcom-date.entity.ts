import { Column } from 'typeorm';
import { GedcomDateModel } from '@features/family-tree/models';

export class GedcomDateEntity implements GedcomDateModel {
  @Column()
  original: string;

  @Column()
  formal: string;
}
