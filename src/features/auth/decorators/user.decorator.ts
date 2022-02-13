import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '@features/users/models/user.model';

export const ContextUser = createParamDecorator<
  unknown,
  ExecutionContext,
  UserModel
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
