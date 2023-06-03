import { ICreateUserDto, Roles } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

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
  password?: string;
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

  @ApiProperty({
    description:
      'Идентификаторы учебных заведений, в которых пользователь будет админом',
    nullable: true,
  })
  institutionsId?: number[];
  @ApiProperty({
    description: 'Подгруппа пользователя, если студент',
    nullable: true,
  })
  subgroup?: string;
  @ApiProperty({
    description: 'Индентификатор группы, если студент',
    nullable: true,
  })
  groupId?: number;
}
