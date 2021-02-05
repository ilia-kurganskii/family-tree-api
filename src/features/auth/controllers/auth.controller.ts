import { AuthService } from '@features/auth/services/auth/auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContextUser } from '@features/auth/decorators/user.decorator';
import { User } from '@features/users/models/user.model';
import { TokenOutputDto } from '@features/auth/dto/token.output.dto';
import { SignupInputDto } from '@features/auth/dto/signup.input.dto';
import { LoginInputDto } from '@features/auth/dto/login.input.dto';
import { UserOutputDto } from '@features/users/dto/user.output.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

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
    type: TokenOutputDto,
  })
  async signup(@Body() data: SignupInputDto): Promise<TokenOutputDto> {
    this.logger.log('signup');
    return await this.auth.signup({
      email: data.email.toLowerCase(),
      password: data.password,
    });
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns access and refresh tokens',
    type: TokenOutputDto,
  })
  async login(@Body() data: LoginInputDto) {
    const { accessToken, refreshToken } = await this.auth.login({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a new access and refresh tokens',
    type: TokenOutputDto,
  })
  async refreshToken(@Body('token') token: string) {
    return this.auth.refreshTokens(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOperation({
    summary: 'Returns current user profile',
  })
  @ApiResponse({
    status: 200,
    type: UserOutputDto,
    description: 'Returns current user',
  })
  @ApiBearerAuth()
  async me(@ContextUser() user: User) {
    return user;
  }
}
