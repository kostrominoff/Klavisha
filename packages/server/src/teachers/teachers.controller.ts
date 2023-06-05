import {
  Controller,
  Param,
  Delete,
  ParseIntPipe,
  ForbiddenException,
  Get,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { NO_ACCESS } from 'src/errors/access.errors';
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('Преподаватели')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Нет доступа',
})
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'institutionId', example: 1, required: false })
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Get()
  findAll(
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('institutionId') institutionId?: number,
  ) {
    if (role !== Roles.ADMIN && institutionId) {
      if (!institutions.map(({ id }) => id).includes(institutionId))
        throw new ForbiddenException(NO_ACCESS);
    }
    return this.teachersService.findAll(
      { page, limit },
      { institutionId, userId },
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @CurrentUser('role') role: Roles,
    @CurrentUser('institutions') institutuins: InstitutionEntity[],
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (role !== Roles.ADMIN) {
      const teacher = await this.teachersService.findOne(id);
      if (!institutuins.map(({ id }) => id).includes(teacher.institution.id))
        throw new ForbiddenException(NO_ACCESS);
    }
    return this.teachersService.delete(id);
  }
}
