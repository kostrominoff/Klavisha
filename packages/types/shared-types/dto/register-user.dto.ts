import { User } from "../user.type";

export interface IRegisterUserDto
  extends Omit<
    User,
    "id" | "roles" | "avatar" | "birthday" | "phone" | "createdAt" | "updatedAt"
  > {
  groupId: number;
}
