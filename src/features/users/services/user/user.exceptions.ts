import { ApplicationError } from '@features/common/types/application-error';
import { APPLICATION_ERROR_CODES } from '@features/common/consts/error-codes';

export class UserAlreadyExists extends ApplicationError {
  constructor(message: string) {
    super(APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS, message);
  }
}

export class UserPasswordDoesNotMatch extends ApplicationError {
  constructor(message: string) {
    super(APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS, message);
  }
}
