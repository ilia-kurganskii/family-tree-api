import { Column, ObjectID } from 'typeorm';
import { PlaceReferenceModel } from '@features/family-tree/models/place-reference.model';

export class PlaceReferenceEntity implements PlaceReferenceModel<ObjectID> {
  @Column()
  original: string;

  @Column()
  description?: ObjectID;
}
