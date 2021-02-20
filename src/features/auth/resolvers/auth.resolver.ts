import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from '../services/auth/auth.service';
import { SignupInputDto } from '@features/auth/dto/signup.input.dto';
import { LoginInputDto } from '@features/auth/dto/login.input.dto';
import { LoggedUserOutputDto } from '@features/auth/dto/logged-user-output.dto';
import { AuthOutputDto } from '@features/auth/dto/auth.output.dto';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@Resolver(() => AuthOutputDto)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => AuthOutputDto)
  async signup(@Args('data') data: SignupInputDto) {
    const { token } = await this.auth.signup({
      email: data.email.toLowerCase(),
      password: data.password,
    });
    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  @Mutation(() => AuthOutputDto)
  async login(@Args('data') data: LoginInputDto) {
    const { email, password } = data;
    const { token } = await this.auth.login({
      email: email.toLowerCase(),
      password: password,
    });

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }

  @Mutation(() => LoggedUserOutputDto)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshTokens(token);
  }

  @ResolveField('user', () => UserOutputDto)
  async user(@Parent() auth: AuthOutputDto) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
