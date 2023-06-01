import { IUpdateInstitutionDto } from '@klavisha/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstitutionDto implements IUpdateInstitutionDto {
  @ApiProperty({
    description: 'Город',
    example: 'Пермь',
  })
  city?: string;
  @ApiProperty({
    description: 'Название учебного заведения',
    example: 'Пермский социальный институт',
  })
  name?: string;
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
    description: 'Владельцы (админы) учебного заведения',
    example: [1, 2],
  })
  owners?: number[];
  @ApiProperty({
    description: 'Ссылка на сайт',
    example: 'https://example.com',
  })
  website?: string;
  @ApiProperty({
    description: 'Описание',
    example: 'Просто текст',
  })
  description?: string;
}
