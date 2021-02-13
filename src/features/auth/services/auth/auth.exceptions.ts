import { ApplicationException } from '@features/common/types/application-exception';
import { ApplicationErrorCode } from '@features/common/consts/error-codes';

export class IncorrectUsername extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationErrorCode.AUTH_LOGIN_INCORRECT, message);
  }
}

export class IncorrectPassword extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationErrorCode.AUTH_PASSWORD_INCORRECT, message);
  }
}

export class IncorrectToken extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationErrorCode.AUTH_TOKEN_INVALID, message);
  }
}
