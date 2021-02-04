import { ApplicationException } from '@features/common/types/application-exception';
import { APPLICATION_ERROR_CODES } from '@features/common/consts/error-codes';

export class IncorrectUsername extends ApplicationException {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_LOGIN_INCORRECT, message);
  }
}

export class IncorrectPassword extends ApplicationException {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_PASSWORD_INCORRECT, message);
  }
}

export class IncorrectToken extends ApplicationException {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_TOKEN_INVALID, message);
  }
}
