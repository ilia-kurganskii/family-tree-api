export interface GenerateTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  refreshTokenId: string;
}
