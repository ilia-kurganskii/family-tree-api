import { NodeService } from '@features/family-tree/services/node/node.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma/prisma.service';

@Module({
  providers: [NodeService, PrismaService],
})
export class UserModule {}
