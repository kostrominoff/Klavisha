import { UserWithoutPassword } from '@klavisha/types';

export type UserRequest = Request & { user: UserWithoutPassword };
