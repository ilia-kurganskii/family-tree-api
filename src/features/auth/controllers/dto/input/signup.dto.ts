import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'email@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    example: 'pa$$word1',
  })
  readonly password: string;
}
