import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../password.service';
import { PrismaService } from '@features/common/services/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  SecurityConfig,
} from '@config/configuration.model';
import { IAuthService } from '@features/auth/services/auth/auth.service.interface';
import {
  LoginPayload,
  SignupPayload,
} from '@features/auth/services/auth/auth.types';
import { Token } from '@features/auth/models/token.model';
import { User } from '@features/users/models/user.model';
import { Role } from '@features/users/models/role.model';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService<ConfigurationVariables>
  ) {}

  public async createUser({ password, email }: SignupPayload): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: Role.USER,
        },
      });

      return this.generateToken({
        userId: user.id,
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${email} already used.`);
      } else {
        throw e;
      }
    }
  }

  public async login({ email, password }: LoginPayload): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateToken({
      userId: user.id,
    });
  }

  public validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  public getUserFromToken(token: string): Promise<User> {
    const tokenPayload = this.jwtService.decode(token);
    if (tokenPayload) {
      const id = this.jwtService.decode(token)['userId'];
      if (id) {
        return this.prisma.user.findUnique({ where: { id } });
      }
    }
    return null;
  }

  public refreshToken(token: string): Token {
    try {
      const { userId } = this.jwtService.verify(token);
      return this.generateToken({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private generateToken(payload: { userId: string }): Token {
    const accessToken = this.jwtService.sign(payload);

    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: securityConfig?.refreshIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
