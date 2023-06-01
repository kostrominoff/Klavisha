import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRequest } from 'src/types/user-request';
import { UserEntity } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
  (key: keyof Omit<UserEntity, 'password'>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    return key ? user[key] : user;
  },
);
