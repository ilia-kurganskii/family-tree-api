import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import {
  ACCESS_TOKEN_COOKIE,
  MAX_AGE_MAXIMUM,
  REFRESH_TOKEN_COOKIE,
} from '@features/auth/const/cookies.const';
import { ContextUser } from '@features/auth/decorators/user.decorator';
import { LoginInputDto } from '@features/auth/dto/login.input.dto';
import { LogoutInputDto } from '@features/auth/dto/logout.input.dto';
import { SignupInputDto } from '@features/auth/dto/signup.input.dto';
import { LoggedUserOutputDto } from '@features/auth/dto/logged-user-output.dto';
import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { Token } from '@features/auth/models/token.model';
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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly auth: AuthService,
    private configService: ConfigService<ConfigurationVariables>
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registers a new user',
    description: 'Registers a new user in the system',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns access and refresh tokens',
    type: LoggedUserOutputDto,
  })
  async signup(
    @Body() data: SignupInputDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoggedUserOutputDto> {
    this.logger.log('signup');

    const { token, user } = await this.auth.signup({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    this.addAuthCookieToResponse(response, token);

    return {
      ...token,
      user,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns access and refresh tokens',
    type: LoggedUserOutputDto,
  })
  async login(
    @Body() data: LoginInputDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoggedUserOutputDto> {
    const { user, token } = await this.auth.login({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    this.addAuthCookieToResponse(response, token);

    return {
      ...token,
      user,
    };
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns a new access and refresh tokens',
    type: LoggedUserOutputDto,
  })
  async refreshToken(
    @Body('token') tokenFromBody: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoggedUserOutputDto> {
    const oldRefreshToken =
      tokenFromBody || request.cookies[REFRESH_TOKEN_COOKIE];

    const { token, user } = await this.auth.refreshTokens(oldRefreshToken);

    this.addAuthCookieToResponse(response, token);

    return {
      ...token,
      user,
    };
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

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout',
  })
  async logout(
    @Body() data: LogoutInputDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const refreshToken =
      data?.refreshToken || request.cookies?.[REFRESH_TOKEN_COOKIE];

    await this.auth.logout({
      refreshToken,
    });

    response.clearCookie(ACCESS_TOKEN_COOKIE);
    response.clearCookie(REFRESH_TOKEN_COOKIE);
  }

  private addAuthCookieToResponse(response: Response, token: Token) {
    const { accessToken, refreshToken, expiresIn } = token;

    response.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...this.getCommonCookieOptions(),
      maxAge: expiresIn,
    });

    response.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...this.getCommonCookieOptions(),
      maxAge: MAX_AGE_MAXIMUM,
    });
  }

  private getCommonCookieOptions(): CookieOptions {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return {
      secure: securityConfig.https,
      httpOnly: securityConfig.https,
    };
  }
}
