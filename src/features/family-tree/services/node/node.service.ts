import { PrismaService } from '@features/common/services/prisma/prisma.service';
import {
  NodeInDifferentTreesException,
  NodeNotFoundException,
} from '@features/family-tree/services/node/node.exceptions';
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
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NodeService {
  private readonly logger = new Logger(NodeService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createNode(
    payload: CreateNodePayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    this.logger.log('createNode');
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
    this.logger.log('getNodesByTreeId');
    return this.prisma.node
      .findMany({
        where: {
          treeId: payload.treeId,
        },
        ...includeParentIdsAndChildrenIds,
      })
      .then((nodes) => nodes.map(addParentAndChildrenIds));
  }

  async addChild(
    payload: AddChildPayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    this.logger.log('addChild');

    const parentNodeQuery = this.prisma.node.findUnique({
      where: {
        id: payload.parentId,
      },
      select: {
        treeId: true,
      },
    });
    const childNodeQuery = this.prisma.node.findUnique({
      where: {
        id: payload.childId,
      },
      select: {
        treeId: true,
      },
    });

    const [parentNode, childNode] = await Promise.all([
      parentNodeQuery,
      childNodeQuery,
    ]);

    if (!parentNode) {
      throw new NodeNotFoundException(
        `Parent node with id "${payload.parentId}" not found`
      );
    }
    if (!childNode) {
      throw new NodeNotFoundException(
        `Child node with id "${payload.childId}" not found`
      );
    }

    if (parentNode.treeId !== childNode.treeId) {
      throw new NodeInDifferentTreesException(
        `Nodes in different trees. Parent tree: ${payload.parentId} , Child tree: ${payload.childId}`
      );
    }

    try {
      return await this.prisma.node
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
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  removeChildren(
    payload: RemoveChildPayload
  ): Promise<NodeWithParentsIdsAndChildrenIds> {
    this.logger.log('removeChildren');
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
