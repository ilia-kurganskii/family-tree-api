import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class TreeOutputDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  id: string;
}
