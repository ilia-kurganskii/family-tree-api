import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType('User')
export class UserOutputDto {
  @Field(() => ID)
  id: string;

  @Field()
  @ApiProperty({
    example: 'email@gmail.com',
  })
  email: string;

  @Field()
  @ApiProperty()
  firstname: string | null;

  @Field()
  @ApiProperty()
  lastname: string | null;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;
}
