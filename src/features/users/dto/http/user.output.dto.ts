import { ApiProperty } from '@nestjs/swagger';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { RoleModel } from '@features/users/models/role.model';

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
  @ApiProperty({
    enum: RoleModel,
  })
  role: RoleModel;

  @HideField()
  password: string;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;
}
