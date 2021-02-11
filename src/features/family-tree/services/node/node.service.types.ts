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
  treeId: string;
  firstname: string;
  lastname?: string;
  description?: string;
}

export interface GetNodesByTreeIdPayload {
  treeId: string;
}

export interface NodeWithParentsIdsAndChildrenIds extends Node {
  parentIds: string[];
  childrenIds: string[];
}
