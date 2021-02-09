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
}
