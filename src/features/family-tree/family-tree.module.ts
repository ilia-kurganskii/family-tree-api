import { FamilyTreeController } from '@features/family-tree/controllers/family-tree/family-tree.controller';
import { NodeService } from '@features/family-tree/services/node/node.service';
import { TreeService } from '@features/family-tree/services/tree/tree.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Module({
  providers: [NodeService, TreeService, PrismaService],
  controllers: [FamilyTreeController],
})
export class FamilyTreeModule {}
