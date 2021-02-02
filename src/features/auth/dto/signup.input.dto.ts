import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInputDto {
  @Field()
  @IsEmail()
  @ApiProperty({
    example: 'email@gmail.com',
  })
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty({
    example: 'pa$$word1',
  })
  readonly password: string;
}
