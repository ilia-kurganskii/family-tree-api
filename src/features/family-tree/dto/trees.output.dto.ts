import { TreeOutputDto } from '@features/family-tree/dto/tree.output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class TreesOutputDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  trees: TreeOutputDto[];
}
