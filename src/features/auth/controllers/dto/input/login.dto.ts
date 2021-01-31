import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'pa$$word1',
  })
  @IsNotEmpty()
  readonly password: string;
}
