import { ApplicationException } from '@features/common/types/application-exception';
import { APPLICATION_ERROR_CODES } from '@features/common/consts/error-codes';

export class UserAlreadyExists extends ApplicationException {
  constructor(message: string) {
    super(APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS, message);
  }
}

export class UserPasswordDoesNotMatch extends ApplicationException {
  constructor(message: string) {
    super(APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS, message);
  }
}
