import { ObjectID, ObjectIdColumn } from 'typeorm';
import { SourceReferenceModel } from '@features/family-tree/models';

export class SourceReferenceEntity implements SourceReferenceModel<ObjectID> {
  @ObjectIdColumn()
  description: ObjectID;
}
