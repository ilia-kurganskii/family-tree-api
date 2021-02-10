import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { Tree } from '@features/family-tree/models/Tree';
import {
  CreateTreePayload,
  GetTreeByIdPayload,
  GetTreeByNodeIdPayload,
  GetTreesByCreatorIdPayload,
} from '@features/family-tree/services/tree/tree.service.types';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TreeService {
  private readonly logger = new Logger(TreeService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createTree(payload: CreateTreePayload): Promise<Tree> {
    this.logger.log('createTree');
    return this.prisma.tree.create({
      data: {
        name: payload.name,
        creator: {
          connect: {
            id: payload.creatorId,
          },
        },
      },
    });
  }

  async getTreesByCreatorId(
    payload: GetTreesByCreatorIdPayload
  ): Promise<Tree[]> {
    this.logger.log('getTreesByCreatorId');
    return this.prisma.tree.findMany({
      where: {
        creatorId: payload.creatorId,
      },
    });
  }

  async getTreeById(payload: GetTreeByIdPayload): Promise<Tree> {
    this.logger.log('getTreeById');
    return this.prisma.tree.findUnique({
      where: {
        id: payload.treeId,
      },
    });
  }

  async getTreeByNodeId(payload: GetTreeByNodeIdPayload): Promise<Tree> {
    this.logger.log('getTreeByNodeId');
    return this.prisma.tree.findFirst({
      include: {
        nodes: {
          where: {
            id: payload.nodeId,
          },
        },
      },
    });
  }
}
