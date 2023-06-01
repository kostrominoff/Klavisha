import { UserEntity } from 'src/users/entities/user.entity';

export type UserRequest = Request & { user: Omit<UserEntity, 'password'> };
