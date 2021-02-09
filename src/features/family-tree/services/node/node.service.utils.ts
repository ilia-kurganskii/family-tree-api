import { Node } from '@features/family-tree/models/Node';
import { NodeWithParentsIdsAndChildrenIds } from '@features/family-tree/services/node/node.service.types';
export function addParentAndChildrenIds(
  node: Node & { parents: { id: string }[]; children: { id: string }[] }
): NodeWithParentsIdsAndChildrenIds {
  const newNode = {
    ...node,
    childrenIds: node.children.map((child) => child.id),
    parentIds: node.parents.map((parent) => parent.id),
  };
  delete newNode.parents;
  delete newNode.children;
  return newNode;
}

export const includeParentIdsAndChildrenIds = {
  include: {
    children: {
      select: {
        id: true,
      },
    },
    parents: {
      select: {
        id: true,
      },
    },
  },
};
