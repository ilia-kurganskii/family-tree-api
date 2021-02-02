import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInputDto {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  oldPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
