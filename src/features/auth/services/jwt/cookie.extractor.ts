import { ACCESS_TOKEN_COOKIE } from '@features/auth/const/cookies.const';
import { Request } from 'express';

export function cookieExtractor(req: Request): string | null | undefined {
  if (req && req.cookies) {
    return req.cookies[ACCESS_TOKEN_COOKIE] ?? null;
  }
  return null;
}
