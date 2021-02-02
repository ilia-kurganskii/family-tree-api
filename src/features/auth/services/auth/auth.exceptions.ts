import { ApplicationError } from '@features/common/types/application-error';
import { APPLICATION_ERROR_CODES } from '@features/common/consts/error-codes';

export class IncorrectUsername extends ApplicationError {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_LOGIN_INCORRECT, message);
  }
}

export class IncorrectPassword extends ApplicationError {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_PASSWORD_INCORRECT, message);
  }
}

export class IncorrectToken extends ApplicationError {
  constructor(message?: string) {
    super(APPLICATION_ERROR_CODES.AUTH_TOKEN_INVALID, message);
  }
}
