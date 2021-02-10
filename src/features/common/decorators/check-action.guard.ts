import { AccessAction } from '@features/common/models/access-action';
import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const METADATA_CHECK_ACTION_KEY = 'METADATA_ACTION_KEY';

export const CheckAccess = (action: AccessAction) =>
  SetMetadata(METADATA_CHECK_ACTION_KEY, action);

export function extractActionFromReflector(
  reflector: Reflector,
  context: ExecutionContext
): AccessAction {
  return reflector.get<AccessAction>(
    METADATA_CHECK_ACTION_KEY,
    context.getHandler()
  );
}
