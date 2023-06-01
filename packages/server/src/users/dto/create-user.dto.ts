import { ICreateUserDto, Roles } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    description: 'Почта',
    example: 'myemail@example.com',
  })
  @IsEmail({}, { message: 'Проверьте почту!' })
  email: string;
  @ApiProperty({
    description: 'Пароль',
    minLength: 8,
  })
  @MinLength(8, { message: 'Пароль должен иметь не менее 8 символов!' })
  password: string;
  @ApiProperty({
    description: 'Роль пользователя',
    enum: Roles,
    nullable: true,
  })
  role?: Roles;
  @ApiProperty({
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Проверьте имя!' })
  firstname: string;
  @ApiProperty({
    description: 'Фамилия пользователя',
  })
  @IsString({ message: 'Проверьте фамилию!' })
  secondname: string;
  @ApiProperty({
    description: 'Отчество пользователя',
    nullable: true,
  })
  fathername?: string;
}
