import { extractActionFromReflector } from '@features/common/decorators/check-action.guard';
import { defineTreeAbilityForUser } from '@features/family-tree/guards/tree.ability';
import { TreeService } from '@features/family-tree/services/tree/tree.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TreeAccessGuard implements CanActivate {
  private readonly logger = new Logger(TreeAccessGuard.name);

  constructor(private reflector: Reflector, private treeService: TreeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const ability = defineTreeAbilityForUser(user);
    const action = extractActionFromReflector(this.reflector, context);

    if (!action) {
      return true;
    }

    try {
      const treeId: string = request.params.id;
      this.logger.log('tree id: ' + treeId);
      const tree = await this.treeService.getTreeById({ treeId });
      if (!tree) {
        return false;
      }
      this.logger.log('has access: ' + ability.can(action, tree));
      return ability.can(action, tree);
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
