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
import { TokenOutputDto } from '@features/auth/dto/token.output.dto';
import { AuthOutputDto } from '@features/auth/dto/auth.output.dto';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@Resolver(() => AuthOutputDto)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => AuthOutputDto)
  async signup(@Args('data') data: SignupInputDto) {
    const { accessToken, refreshToken } = await this.auth.signup({
      email: data.email.toLowerCase(),
      password: data.password,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => AuthOutputDto)
  async login(@Args('data') data: LoginInputDto) {
    const { email, password } = data;
    const { accessToken, refreshToken } = await this.auth.login({
      email: email.toLowerCase(),
      password: password,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => TokenOutputDto)
  async refreshToken(@Args('token') token: string) {
    return this.auth.refreshTokens(token);
  }

  @ResolveField('user', () => UserOutputDto)
  async user(@Parent() auth: AuthOutputDto) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
