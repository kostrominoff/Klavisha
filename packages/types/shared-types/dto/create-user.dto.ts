import { Roles } from "../roles.enum";

export interface ICreateUserDto {
  email: string;
  password?: string;
  role?: Roles;
  firstname: string;
  secondname: string;
  fathername?: string;
  // Group
  groupId?: number;
  subgroup?: string;
  // Institution admin
  institutionsId?: number[];
}
