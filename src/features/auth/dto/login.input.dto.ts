import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginInputDto {
  @Field()
  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsEmail()
  readonly email!: string;

  @Field()
  @ApiProperty({
    example: 'pa$$word1',
  })
  @IsNotEmpty()
  readonly password!: string;
}
