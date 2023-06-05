import { User } from "../user.type";

export interface IRegisterUserDto
  extends Omit<
    User,
    "id" | "role" | "avatar" | "birthday" | "phone" | "createdAt" | "updatedAt"
  > {
  groupId: number;
}
