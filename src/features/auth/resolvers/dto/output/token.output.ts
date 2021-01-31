import { Field, ObjectType } from '@nestjs/graphql';
import { Token } from '@features/auth/models/token.model';

@ObjectType()
export class TokenOutput extends Token {
  @Field({ description: 'JWT access token' })
  accessToken: string;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;
}
