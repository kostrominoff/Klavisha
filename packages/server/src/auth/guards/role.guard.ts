import { Roles } from '@klavisha/types';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRequest } from 'src/types/user-request';

export class RoleGuard implements CanActivate {
  constructor(private readonly roles: Roles[]) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest<UserRequest>();

    return this.roles.some((role) => user.roles.includes(role));
  }
}
