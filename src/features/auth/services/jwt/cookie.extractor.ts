import { ACCESS_TOKEN_COOKIE } from '@features/auth/const/cookies.const';
import { Request } from 'express';

export function cookieExtractor(req: Request): string | null | undefined {
  let token = undefined;
  if (req && req.cookies) {
    token = req.cookies[ACCESS_TOKEN_COOKIE];
  }
  return token;
}
