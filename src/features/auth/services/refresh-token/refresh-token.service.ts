import { RefreshToken } from '@features/auth/models/refresh-token.model';
import {
  CreateRefreshTokenPayload,
  GetRefreshTokenByIdPayload,
  RecreateRefreshTokenPayload,
  RemoveRefreshTokenPayload,
} from '@features/auth/services/refresh-token/refresh-token.service.types';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  public async createRefreshToken(
    payload: CreateRefreshTokenPayload
  ): Promise<RefreshToken> {
    this.logger.log('createRefreshToken');
    return this.refreshTokenRepository.save({
      userId: payload.userId,
    });
  }

  public async recreateRefreshToken(
    payload: RecreateRefreshTokenPayload
  ): Promise<RefreshToken> {
    this.logger.log('recreateRefreshToken');

    await this.refreshTokenRepository.delete(payload.tokenId);

    const createdToken = await this.refreshTokenRepository.save({
      userId: payload.userId,
    });

    this.logger.log('token' + createdToken);

    return createdToken;
  }

  public async removeRefreshToken(
    payload: RemoveRefreshTokenPayload
  ): Promise<void> {
    this.logger.log('removeRefreshToken');
    await this.refreshTokenRepository.delete(payload.tokenId);
  }

  public async isRefreshTokenExist(
    payload: GetRefreshTokenByIdPayload
  ): Promise<boolean> {
    this.logger.log(`isRefreshTokenExist`);
    const token = await this.refreshTokenRepository.findOne(payload.tokenId);
    return token?.userId === payload.userId;
  }
}
