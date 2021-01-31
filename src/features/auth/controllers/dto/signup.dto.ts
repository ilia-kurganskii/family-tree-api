import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
