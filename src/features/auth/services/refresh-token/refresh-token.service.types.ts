export interface CreateRefreshTokenPayload {
  userId: string;
}

export interface RecreateRefreshTokenPayload {
  userId: string;
  tokenId: string;
}

export interface GetRefreshTokenByIdPayload {
  tokenId: string;
  userId: string;
}

export interface RemoveRefreshTokenPayload {
  tokenId: string;
}
