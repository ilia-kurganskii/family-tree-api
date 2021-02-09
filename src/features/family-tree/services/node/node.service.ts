import { PrismaService } from '@features/common/services/prisma/prisma.service';
import {
  AddChildPayload,
  CreateNodePayload,
  RemoveChildPayload,
} from '@features/family-tree/services/node/node.service.types';
import { Injectable } from '@nestjs/common';
import { Node } from '@features/family-tree/models/Node';

@Injectable()
export class NodeService {
  constructor(private readonly prisma: PrismaService) {}

  createNode(payload: CreateNodePayload): Promise<Node> {
    return this.prisma.node.create({
      data: {
        firstname: payload.firstname,
        lastname: payload.lastname,
      },
    });
  }

  addChildren(payload: AddChildPayload): Promise<Node> {
    return this.prisma.node.update({
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
    });
  }

  removeChildren(payload: RemoveChildPayload): Promise<Node> {
    return this.prisma.node.update({
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
    });
  }
}
