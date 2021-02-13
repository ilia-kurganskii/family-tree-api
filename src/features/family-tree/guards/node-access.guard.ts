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
export class NodeAccessGuard implements CanActivate {
  private readonly logger = new Logger(NodeAccessGuard.name);

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
      const nodeId = request.params.id;
      this.logger.log('node id: ' + nodeId);
      const tree = await this.treeService.getTreeByNodeId({ nodeId });
      if (!tree) {
        return false;
      }
      return ability.can(action, tree);
    } catch (e) {
      this.logger.error('Error while checking node access', e.trace);
      return false;
    }
  }
}
