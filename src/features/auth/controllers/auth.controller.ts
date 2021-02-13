import { ContextUser } from '@features/auth/decorators/user.decorator';
import { LoginInputDto } from '@features/auth/dto/login.input.dto';
import { SignupInputDto } from '@features/auth/dto/signup.input.dto';
import { TokenOutputDto } from '@features/auth/dto/token.output.dto';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { AuthService } from '@features/auth/services/auth/auth.service';
import { UserOutputDto } from '@features/users/dto/user.output.dto';
import { User } from '@features/users/models/user.model';
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registers a new user',
    description: 'Registers a new user in the system',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
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
  async login(@Body() data: LoginInputDto): Promise<TokenOutputDto> {
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
  async refreshToken(@Body('token') token: string): Promise<TokenOutputDto> {
    return this.auth.refreshTokens(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiOperation({
    summary: 'Returns current user profile',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserOutputDto,
    description: 'Returns current user',
  })
  @ApiBearerAuth()
  async me(@ContextUser() user: User) {
    return user;
  }
}
