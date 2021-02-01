import { ObjectType } from '@nestjs/graphql';
import { TokenOutputDto } from '@features/auth/dto/token.output.dto';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@ObjectType()
export class AuthOutputDto extends TokenOutputDto {
  user: UserOutputDto;
}
