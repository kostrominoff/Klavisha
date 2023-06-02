import { IUpdateGroupDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto implements IUpdateGroupDto {
  @ApiProperty({
    description: 'Название группы',
    example: 'Группа 1',
  })
  name?: string;
  @ApiProperty({
    description: 'Идентификатор учебного заведения',
    example: 1,
  })
  institutionId?: number;
}
