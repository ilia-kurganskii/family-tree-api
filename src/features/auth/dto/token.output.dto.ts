import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenOutputDto {
  @Field()
  @ApiProperty()
  accessToken: string;

  @Field()
  @ApiProperty()
  refreshToken: string;
}
