import { Roles } from '@klavisha/types';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

export const Auth = (roles?: Roles[]) =>
  roles ? UseGuards(JwtGuard, new RoleGuard(roles)) : UseGuards(JwtGuard);
