import { IUpdateStudentDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto implements IUpdateStudentDto {
  @ApiProperty({
    description: 'Идентификатор группы',
    example: 1,
  })
  groupId?: number;
  @ApiProperty({
    description: 'Подгруппа',
    example: 'А',
  })
  subgroup?: string;
}
