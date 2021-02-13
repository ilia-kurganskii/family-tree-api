import { User } from '@features/users/models/user.model';
import { blueUser } from '@features/users/models/user.model.mock';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AllowAllGuard implements CanActivate {
  constructor(private readonly user: User = blueUser) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    req.user = this.user;
    return true;
  }
}
