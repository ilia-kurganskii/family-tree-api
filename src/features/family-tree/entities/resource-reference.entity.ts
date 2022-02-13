import { ObjectID, ObjectIdColumn } from 'typeorm';
import { ResourceReferenceModel } from '@features/family-tree/models';

export class ResourceReferenceEntity
  implements ResourceReferenceModel<ObjectID> {
  @ObjectIdColumn()
  resource: ObjectID;
}
