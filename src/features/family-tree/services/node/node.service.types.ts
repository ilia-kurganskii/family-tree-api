import { Node } from '@features/family-tree/models/Node';

export interface AddChildPayload {
  parentId: string;
  childId: string;
}

export interface RemoveChildPayload {
  parentId: string;
  childId: string;
}

export interface CreateNodePayload {
  firstname: string;
  lastname?: string;
}
