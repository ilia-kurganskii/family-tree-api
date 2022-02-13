import { Column } from 'typeorm';
import { GenderType } from '@features/family-tree/models';

export class GenderEntity {
  @Column()
  type: GenderType;
}
