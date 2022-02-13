import { ResourceReferenceModel } from '@features/family-tree/models';

export interface AttributionModel<ID = string> {
  contributor?: ResourceReferenceModel<ID>;

  modified?: number;

  changeMessage?: string;

  creator?: string;

  created?: number;
}
