import { ApplicationErrorCode } from '@features/common/consts/error-codes';
import { HttpStatus } from '@nestjs/common';

export function mapCodeToStatus(code: ApplicationErrorCode): HttpStatus {
  switch (code) {
    case ApplicationErrorCode.NODE_NOT_FOUND:
      return HttpStatus.NOT_FOUND;
    case ApplicationErrorCode.USER_ALREADY_EXISTS:
    case ApplicationErrorCode.AUTH_LOGIN_INCORRECT:
    case ApplicationErrorCode.AUTH_PASSWORD_INCORRECT:
    case ApplicationErrorCode.USER_PASSWORD_DOES_NOT_MATCH:
    case ApplicationErrorCode.NODE_IN_DIFF_TREE_EXCEPTION:
      return HttpStatus.BAD_REQUEST;
    case ApplicationErrorCode.AUTH_TOKEN_INVALID:
      return HttpStatus.UNAUTHORIZED;
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
}
