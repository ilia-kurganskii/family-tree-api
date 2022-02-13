import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';
export interface JwtInputDto {
  userId: string;
}

@InputType()
export class RefreshTokenInputDto {
  @Field()
  @ApiProperty()
  readonly token!: string;
}
