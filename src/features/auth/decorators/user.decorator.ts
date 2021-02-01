import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@features/users/models/user.model';

export const ContextUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
