import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../../auth/decorators/user-gql.decorator';
import { User } from '../models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserService } from '@features/users/services/user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtGqlAuthGuard } from '@features/auth/guards/jwt-gql-auth.guard';

@Resolver(() => User)
@UseGuards(JwtGqlAuthGuard)
export class ProfileResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async me(@GqlUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User)
  async update(
    @GqlUser() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @Mutation(() => User)
  async changePassword(
    @GqlUser() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }
}
