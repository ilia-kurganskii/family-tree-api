import { RefreshToken } from '@features/auth/models/refresh-token.model';
import {
  CreateRefreshTokenPayload,
  GetRefreshTokenByIdPayload,
  RecreateRefreshTokenPayload,
  RemoveRefreshTokenPayload,
} from '@features/auth/services/refresh-token/refresh-token.types';
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(private prismaService: PrismaService) {}

  public createRefreshToken(
    payload: CreateRefreshTokenPayload
  ): Promise<RefreshToken> {
    this.logger.log('createRefreshToken');
    return this.prismaService.refreshToken.create({
      data: {
        userId: payload.userId,
      },
    });
  }

  public async recreateRefreshToken(
    payload: RecreateRefreshTokenPayload
  ): Promise<RefreshToken> {
    this.logger.log('recreateRefreshToken');
    const removeToken = this.prismaService.refreshToken.delete({
      where: {
        id: payload.tokenId,
      },
    });

    const createToken = this.prismaService.refreshToken.create({
      data: {
        userId: payload.userId,
      },
    });

    const [refreshTokenEntity] = await this.prismaService.$transaction([
      createToken,
      removeToken,
    ]);

    return refreshTokenEntity;
  }

  public async removeRefreshToken(
    payload: RemoveRefreshTokenPayload
  ): Promise<void> {
    this.logger.log('removeRefreshToken');
    await this.prismaService.refreshToken.delete({
      where: {
        id: payload.tokenId,
      },
    });
  }

  public async isRefreshTokenExist(
    payload: GetRefreshTokenByIdPayload
  ): Promise<boolean> {
    this.logger.log('isRefreshTokenExist');
    const token = await this.prismaService.refreshToken.findFirst({
      where: {
        id: payload.tokenId,
        userId: payload.userId,
      },
    });
    return !!token;
  }
}
