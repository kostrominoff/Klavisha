import { UserWithoutPassword } from '@klavisha/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRequest } from 'src/types/user-request';

export const CurrentUser = createParamDecorator(
  (key: keyof UserWithoutPassword, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    return key ? user[key] : user;
  },
);
