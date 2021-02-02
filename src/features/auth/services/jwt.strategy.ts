import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import { JwtInputDto } from '@features/auth/dto/jwt.input.dto';
import { User } from '@features/users/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService<ConfigurationVariables>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<SecurityConfig>('security').jwtSecret,
    });
  }

  async validate(payload: JwtInputDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
