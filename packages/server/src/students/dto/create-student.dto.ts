import { ICreateStudentDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStudentDto implements ICreateStudentDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: 1,
  })
  @IsNumber({}, { message: 'Проверьте пользователя!' })
  userId: number;
  @ApiProperty({
    description: 'Идентификатор группы',
    example: 1,
  })
  @IsNumber({}, { message: 'Проверьте группу!' })
  groupId: number;
  @ApiProperty({
    description: 'Подгруппа',
    example: 'А',
  })
  subgroup?: string;
}
