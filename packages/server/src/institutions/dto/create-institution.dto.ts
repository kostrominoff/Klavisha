import { ICreateInstitutionDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateInstitutionDto implements ICreateInstitutionDto {
  @ApiProperty({
    description: 'Владельцы (админы) учебного заведения',
    example: [1, 2],
  })
  @IsArray({ message: 'Проверьте администраторов!' })
  @ArrayMinSize(1, { message: 'Выберите администратора!' })
  owners: number[];
  @ApiProperty({
    description: 'Название учебного заведения',
    example: 'Пермский социальный институт',
  })
  @IsString({ message: 'Введите название!' })
  name: string;
  @ApiProperty({
    description: 'Номер телефона',
    example: '+79123456789',
  })
  phone?: string;
  @ApiProperty({
    description: 'Ссылка на фотографию',
    example: '/uploads/123.jpg',
  })
  photo?: string;
  @ApiProperty({
    description: 'Описание',
    example: 'Просто текст',
  })
  description?: string;
  @ApiProperty({
    description: 'Ссылка на сайт',
    example: 'https://example.com',
  })
  website?: string;
  @ApiProperty({
    description: 'Город',
    example: 'Пермь',
  })
  @IsString({ message: 'Введите город!' })
  city: string;
}
