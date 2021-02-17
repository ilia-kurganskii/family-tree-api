import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenOutputDto {
  @Field({ description: 'JWT access token' })
  accessToken: string;

  @Field({ description: 'JWT expires in seconds' })
  expiresIn: number;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;
}
