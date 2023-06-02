import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Учебные заведения')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Нет доступа',
})
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Учебное заведение создано',
  })
  @Auth([GuardRoles.ADMIN])
  @ApiCookieAuth()
  @Post()
  async create(@Body() dto: CreateInstitutionDto) {
    return await this.institutionsService.create(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'name', example: 'Институт', required: false })
  @ApiQuery({ name: 'city', example: 'Москва', required: false })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('name') name = '',
    @Query('city') city = '',
  ) {
    return await this.institutionsService.findAll(limit, page, { name, city });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.institutionsService.findOneById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Учебное заведение обновлено',
  })
  @ApiCookieAuth()
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInstitutionDto,
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
  ) {
    if (role !== Roles.ADMIN)
      await this.institutionsService.checkIsOwner(id, userId);

    return await this.institutionsService.update(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Учебное заведение удалено',
  })
  @ApiCookieAuth()
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
  ) {
    if (role !== Roles.ADMIN)
      await this.institutionsService.checkIsOwner(id, userId);
    return await this.institutionsService.delete(id);
  }
}
