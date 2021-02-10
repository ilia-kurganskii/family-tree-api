import { CommonModule } from '@features/common/common.module';
import { FamilyTreeController } from '@features/family-tree/controllers/family-tree/family-tree.controller';
import { NodeService } from '@features/family-tree/services/node/node.service';
import { TreeService } from '@features/family-tree/services/tree/tree.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule],
  providers: [NodeService, TreeService],
  controllers: [FamilyTreeController],
})
export class FamilyTreeModule {}
