import { ApplicationErrorCode } from '@features/common/consts/error-codes';

export class ApplicationException extends Error {
  constructor(public readonly code: ApplicationErrorCode, message: string) {
    super(message);
  }
}
