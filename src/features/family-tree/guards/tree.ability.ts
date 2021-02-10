import { defineAbility } from '@casl/ability';
import { AccessAction } from '@features/common/models/access-action';
import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';

export function defineTreeAbilityForUser(user: User) {
  return defineAbility(
    (can) => {
      if (user.role === Role.ADMIN) {
        can(AccessAction.Manage, 'all');
      }
      can(AccessAction.Manage, 'Tree', { creatorId: user.id });
    },
    {
      detectSubjectType: () => 'Tree',
    }
  );
}
