import { AuthService } from '@features/auth/services/auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/input/signup.dto';
import { LoginDto } from './dto/input/login.dto';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@features/auth/decorators/user.decorator';
import { UserDto } from '@features/auth/controllers/dto/output/user.dto';
import { TokenDto } from '@features/auth/controllers/dto/output/token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Registers a new user',
    description: 'Registers a new user in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns access and refresh tokens',
    type: TokenDto,
  })
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
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens',
    type: TokenDto,
  })
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
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Returns a new access and refresh tokens',
    type: TokenDto,
  })
  async refreshToken(@Body('token') token: string) {
    return this.auth.refreshToken(token);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOperation({
    summary: 'Returns current user profile',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'Returns current user',
  })
  async me(@User() user) {
    return user;
  }
}
