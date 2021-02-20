import { UserOutputDto } from '@features/users/dto/user.output.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserOutputDto {
  @Field({ description: 'JWT access token' })
  accessToken: string;

  @Field({ description: 'JWT expires in seconds' })
  expiresIn: number;

  @Field({ description: 'JWT refresh token' })
  refreshToken: string;

  @Field()
  user: UserOutputDto;
}
