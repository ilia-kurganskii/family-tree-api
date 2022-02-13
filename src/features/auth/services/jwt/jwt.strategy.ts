import { cookieExtractor } from '@features/auth/services/jwt/cookie.extractor';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import { JwtInputDto } from '@features/auth/dto/jwt.input.dto';
import { UserModel } from '@features/users/models/user.model';
import { UserService } from '@features/users/services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    readonly configService: ConfigService<ConfigurationVariables>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<SecurityConfig>('security').jwtSecret,
    });
  }

  async validate(payload: JwtInputDto): Promise<UserModel> {
    this.logger.log('validate jwt payload');
    const user = await this.userService.findUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.logger.log('logged as user with id: ' + String(user.id));
    return user;
  }
}
