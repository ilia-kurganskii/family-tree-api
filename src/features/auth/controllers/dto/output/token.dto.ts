import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@features/auth/models/token.model';

export class TokenDto extends Token {
  @ApiProperty({
    description: 'JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
  })
  refreshToken: string;
}
