import { defineAbility } from '@casl/ability';
import { AccessActionModel } from '@features/common/models/access-action.model';
import { Role } from '@features/users/models/role.model';
import { User } from '@features/users/models/user.model';

export function defineTreeAbilityForUser(user: User) {
  return defineAbility(
    (can) => {
      if (user.role === Role.ADMIN) {
        can(AccessActionModel.Manage, 'all');
      }
      can(AccessActionModel.Manage, 'Tree', { creatorId: user.id });
    },
    {
      detectSubjectType: () => 'Tree',
    }
  );
}
