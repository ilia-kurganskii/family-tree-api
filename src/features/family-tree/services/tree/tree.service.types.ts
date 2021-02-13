export interface CreateTreePayload {
  name: string;
  creatorId: string;
}

export interface GetTreesByCreatorIdPayload {
  creatorId: string;
}

export interface GetTreeByIdPayload {
  treeId: string;
}

export interface GetTreeByNodeIdPayload {
  nodeId: string;
}
