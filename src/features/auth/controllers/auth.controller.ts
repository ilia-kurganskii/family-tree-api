import { AuthService } from '@features/auth/services/auth/auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from '@features/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: SignupDto) {
    const { accessToken, refreshToken } = await this.auth.createUser({
      email: data.email.toLowerCase(),
      password: data.password,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    const { accessToken, refreshToken } = await this.auth.login(
      data.email.toLowerCase(),
      data.password
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('/refresh')
  async refreshToken(@Body('token') token: string) {
    return this.auth.refreshToken(token);
  }

  @Get('/me')
  async me(@UserEntity() user) {
    return user;
  }
}
