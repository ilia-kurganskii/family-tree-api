import { ApplicationErrorCode } from '@features/common/consts/error-codes';
import { ApplicationException } from '@features/common/types/application-exception';

export class NodeNotFoundException extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationErrorCode.NODE_NOT_FOUND, message);
  }
}

export class NodeInDifferentTreesException extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationErrorCode.NODE_IN_DIFF_TREE_EXCEPTION, message);
  }
}
