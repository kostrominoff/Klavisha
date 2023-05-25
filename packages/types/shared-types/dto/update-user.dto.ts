import { ICreateUserDto } from "./create-user.dto";

export interface IUpdateUserDto extends Partial<ICreateUserDto> {
  avatar?: string;
  birthday?: Date;
  phone?: string;
}

