import { GuardRoles, Roles } from '@klavisha/types';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRequest } from 'src/types/user-request';

export class RoleGuard implements CanActivate {
  constructor(private readonly roles: GuardRoles[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest<UserRequest>();

    return this.roles.some((role) => {
      switch (role) {
        case GuardRoles.ADMIN:
          return user.role === Roles.ADMIN;
        // case GuardRoles.STUDENT: return !!user.student
        // case GuardRoles.TEACHER: return !!user.teacher
        case GuardRoles.INSTITUTION_ADMIN:
          return !!user.institutions?.length;
        default:
          return false;
      }
    });
  }
}
