import { CommonModule } from '@features/common/common.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule],
})
export class FamilyTreeModule {}
