import { RefreshTokenService } from '@features/auth/services/refresh-token/refresh-token.service';
import { CommonModule } from '@features/common/common.module';
import { PasswordService } from './services/password/password.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  SecurityConfig,
} from 'config/configuration.model';
import { AuthController } from '@features/auth/controllers/auth.controller';
import { DateScalar } from '@features/common/scalars/date.scalar';
import { ApplicationJwtService } from '@features/auth/services/jwt/application-jwt.service';
import { UserModule } from '@features/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from '@features/auth/models/refresh-token.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (
        configService: ConfigService<ConfigurationVariables>
      ) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: securityConfig.jwtSecret,
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    CommonModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    ApplicationJwtService,
    RefreshTokenService,
    JwtStrategy,
    JwtAuthGuard,
    PasswordService,
    DateScalar,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
