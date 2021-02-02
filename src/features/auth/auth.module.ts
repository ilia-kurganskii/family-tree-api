import { PrismaService } from '../common/services/prisma.service';
import { PasswordService } from './services/password.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  SecurityConfig,
} from 'config/configuration.model';
import { AuthController } from '@features/auth/controllers/auth.controller';
import { DateScalar } from '@features/common/scalars/date.scalar';

@Module({
  imports: [
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    JwtAuthGuard,
    PasswordService,
    PrismaService,
    DateScalar,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
