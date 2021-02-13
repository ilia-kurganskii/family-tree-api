import { AccessActionModel } from '@features/common/models/access-action.model';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const METADATA_CHECK_ACTION_KEY = 'METADATA_ACTION_KEY';

export const CheckAccess = (action: AccessActionModel) =>
  SetMetadata(METADATA_CHECK_ACTION_KEY, action);

export function extractActionFromReflector(
  reflector: Reflector,
  context: ExecutionContext
): AccessActionModel {
  return reflector.get<AccessActionModel>(
    METADATA_CHECK_ACTION_KEY,
    context.getHandler()
  );
}
