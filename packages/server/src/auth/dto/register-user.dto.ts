import { IRegisterUserDto, Roles } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterUserDto implements IRegisterUserDto {
  @ApiProperty({
    description: 'Номер группы',
    example: 1,
  })
  @IsNumber({}, { message: 'Проверьте группу!' })
  groupId: number;
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
