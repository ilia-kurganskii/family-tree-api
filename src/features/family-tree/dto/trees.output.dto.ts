import { TreeOutputDto } from '@features/family-tree/dto/tree.output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TreesOutputDto {
  @ApiProperty({})
  trees: TreeOutputDto[];
}
