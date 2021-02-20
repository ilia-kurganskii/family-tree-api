import { ObjectType } from '@nestjs/graphql';
import { LoggedUserOutputDto } from '@features/auth/dto/logged-user-output.dto';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@ObjectType()
export class AuthOutputDto extends LoggedUserOutputDto {
  user: UserOutputDto;
}
