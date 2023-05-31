import { ILoginUserDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto implements ILoginUserDto {
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
}
