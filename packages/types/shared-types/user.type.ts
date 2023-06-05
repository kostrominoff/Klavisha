import { Roles } from "./roles.enum";

export type User = {
  id: number;
  email: string;
  password: string;
  role: Roles;
  firstname: string;
  secondname: string;
  fathername?: string;
  avatar?: string;
  birthday?: Date;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithoutPassword = Omit<User, "password">;
