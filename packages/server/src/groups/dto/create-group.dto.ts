import { ICreateGroupDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateGroupDto implements ICreateGroupDto {
  @ApiProperty({
    description: 'Название группы',
    example: 'Группа 1',
  })
  @IsString({ message: 'Введите название группы!' })
  name: string;
  @ApiProperty({
    description: 'Идентификатор учебного заведения',
    example: 1,
  })
  @IsNumber({}, { message: 'Введите учебное заведение!' })
  institutionId: number;
}
