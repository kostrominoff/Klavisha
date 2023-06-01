import { IUpdateUserDto, Roles } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements IUpdateUserDto {
  @ApiProperty({
    description: 'Почта',
    example: 'myemail@example.com',
    nullable: true,
  })
  email?: string;
  @ApiProperty({
    description: 'Номер телефона',
    nullable: true,
  })
  phone?: string;
  @ApiProperty({
    description: 'Роль пользователя',
    enum: Roles,
    nullable: true,
  })
  role: Roles;
  @ApiProperty({
    description: 'Ссылка на аватар',
    nullable: true,
  })
  avatar?: string;
  @ApiProperty({
    description: 'Дата рождения',
    nullable: true,
  })
  birthday?: Date;
  @ApiProperty({
    description: 'Пароль',
    minLength: 8,
    nullable: true,
  })
  password?: string;
  @ApiProperty({
    description: 'Имя пользователя',
    nullable: true,
  })
  firstname?: string;
  @ApiProperty({
    description: 'Фамилия пользователя',
    nullable: true,
  })
  secondname?: string;
  @ApiProperty({
    description: 'Отчество пользователя',
    nullable: true,
  })
  fathername?: string;
}
