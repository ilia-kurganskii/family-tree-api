import { PrismaService } from '@features/common/services/prisma/prisma.service';
import {
  AddChildPayload,
  CreateNodePayload,
  GetNodesByTreeIdPayload,
  NodeWithParentsIdsAndChildrenIds,
  RemoveChildPayload,
} from '@features/family-tree/services/node/node.service.types';
import {
  addParentAndChildrenIds,
  includeParentIdsAndChildrenIds,
} from '@features/family-tree/services/node/node.service.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  async createNode(
    payload: CreateNodePayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    return this.prisma.node
      .create({
        data: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          tree: {
            connect: {
              id: payload.treeId,
            },
          },
        },
        ...includeParentIdsAndChildrenIds,
      })
      .then(addParentAndChildrenIds);
  }

  async getNodesByTreeId(
    payload: GetNodesByTreeIdPayload
  ): Promise<NodeWithParentsIdsAndChildrenIds[]> {
    return this.prisma.node
      .findMany({
        where: {
          treeId: payload.treeId,
        },
        ...includeParentIdsAndChildrenIds,
      })
      .then((nodes) => nodes.map(addParentAndChildrenIds));
  }

  addChild(
    payload: AddChildPayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    return this.prisma.node
      .update({
        where: {
          id: payload.parentId,
        },
        data: {
          children: {
            connect: {
              id: payload.childId,
            },
          },
        },
        ...includeParentIdsAndChildrenIds,
      })
      .then(addParentAndChildrenIds);
  }

  removeChildren(
    payload: RemoveChildPayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    return this.prisma.node
      .update({
        where: {
          id: payload.parentId,
        },
        data: {
          children: {
            disconnect: {
              id: payload.childId,
            },
          },
        },
        ...includeParentIdsAndChildrenIds,
      })
      .then(addParentAndChildrenIds);
  }
}
