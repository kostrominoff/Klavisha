import { Roles } from "../roles.enum";

export interface ICreateUserDto {
  email: string;
  password: string;
  role?: Roles;
  firstname: string;
  secondname: string;
  fathername?: string;
}
