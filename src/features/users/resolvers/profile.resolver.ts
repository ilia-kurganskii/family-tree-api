import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../../auth/decorators/user-gql.decorator';
import { User } from '../models/user.model';
import { ChangePasswordInputDto } from '../dto/change-password.input.dto';
import { UserService } from '@features/users/services/user/user.service';
import { UpdateUserInputDto } from '../dto/update-user.input.dto';
import { JwtGqlAuthGuard } from '@features/auth/guards/jwt-gql-auth.guard';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@Resolver(() => UserOutputDto)
@UseGuards(JwtGqlAuthGuard)
export class ProfileResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserOutputDto)
  async me(@GqlUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => UserOutputDto)
  async update(
    @GqlUser() user: User,
    @Args('data') newUserData: UpdateUserInputDto
  ) {
    return this.userService.updateUser({
      userId: user.id,
      ...newUserData,
    });
  }

  @Mutation(() => UserOutputDto)
  async changePassword(
    @GqlUser() user: User,
    @Args('data') changePassword: ChangePasswordInputDto
  ) {
    return this.userService.changePassword({
      userId: user.id,
      currentPassword: user.password,
      oldPassword: changePassword.oldPassword,
      newPassword: changePassword.newPassword,
    });
  }
}
