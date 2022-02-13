import { Entity } from 'typeorm';
import { SourceDescriptionModel } from '@features/family-tree/models';

@Entity()
export class SourceDescriptionEntity implements SourceDescriptionModel {}
