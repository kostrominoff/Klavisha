import { Roles } from "../roles.enum";

export interface ICreateUserDto {
  email: string;
  password: string;
  roles?: Roles[];
  firstname: string;
  secondname: string;
  fathername?: string;
}
