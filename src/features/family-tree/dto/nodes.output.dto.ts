import { NodeOutputDto } from '@features/family-tree/dto/node.output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class NodesOutputDto {
  @ApiProperty()
  nodes: NodeOutputDto[];
}
