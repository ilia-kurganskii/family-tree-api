import { ApiProperty } from '@nestjs/swagger';

export class NodeOutputDto {
  @ApiProperty({})
  id: string;

  @ApiProperty({})
  firstname: string;

  @ApiProperty({})
  lastname: string;

  @ApiProperty({})
  parentIds: string[];

  @ApiProperty({})
  childrenIds: string[];
}
