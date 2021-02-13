import { ApplicationErrorCode } from '@features/common/consts/error-codes';
import { ApplicationException } from '@features/common/types/application-exception';

export class UserAlreadyExists extends ApplicationException {
  constructor(message: string) {
    super(ApplicationErrorCode.USER_ALREADY_EXISTS, message);
  }
}

export class UserPasswordDoesNotMatch extends ApplicationException {
  constructor(message: string) {
    super(ApplicationErrorCode.USER_ALREADY_EXISTS, message);
  }
}
