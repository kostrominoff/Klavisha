import { ICreateUserDto, Roles } from '@klavisha/types';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail({}, { message: 'Проверьте почту!' })
  email: string;
  @MinLength(8, { message: 'Пароль должен иметь не менее 8 символов!' })
  password: string;
  roles?: Roles[];
  @IsString({ message: 'Проверьте имя!' })
  firstname: string;
  @IsString({ message: 'Проверьте фамилию!' })
  secondname: string;
  fathername?: string;
}
