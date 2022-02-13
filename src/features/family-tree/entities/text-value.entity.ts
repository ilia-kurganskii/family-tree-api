import { Column } from 'typeorm';
import { TextValueModel } from '@features/family-tree/models';

export class TextValueEntity implements TextValueModel {
  @Column()
  lang?: string;

  @Column()
  value: string;
}
