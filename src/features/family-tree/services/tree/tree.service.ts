import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { Tree } from '@features/family-tree/models/Tree';
import { CreateTreePayload } from '@features/family-tree/services/tree/tree.service.types';

import { Injectable } from '@nestjs/common';

@Injectable()
export class TreeService {
  constructor(private readonly prisma: PrismaService) {}

  async createTree(payload: CreateTreePayload): Promise<Tree> {
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
}
