import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { InstitutionsService } from 'src/institutions/institutions.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { UpdateGroupDto } from './dto/update-group.dto';
import { NOT_FOUND } from 'src/errors/group.errors';

@ApiTags('Группы')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Нет доступа',
})
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly institutionsService: InstitutionsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Группа создана',
  })
  @ApiCookieAuth()
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Post()
  async create(
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: Roles,
    @Body() dto: CreateGroupDto,
  ) {
    if (userRole !== Roles.ADMIN) {
      const institution = await this.institutionsService.findOneById(
        dto.institutionId,
      );
      if (!institution) throw new NotFoundException(NOT_FOUND);

      await this.institutionsService.checkIsOwner(institution.id, userId);
    }
    return await this.groupsService.create(dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @Auth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.groupsService.findOneById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({ name: 'institutionId', example: 1, required: false })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('institutionId') institutionId?: number,
  ) {
    return await this.groupsService.findAll({ page, limit }, institutionId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Группа обновлена',
  })
  @ApiCookieAuth()
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: Roles,
  ) {
    if (userRole !== Roles.ADMIN) {
      const group = await this.groupsService.findOneById(id);
      if (!group) throw new NotFoundException(NOT_FOUND);
      await this.institutionsService.checkIsOwner(group.institution.id, userId);
    }

    return await this.groupsService.update(id, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Группа удалена',
  })
  @ApiCookieAuth()
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @CurrentUser('role') userRole: Roles,
  ) {
    if (userRole !== Roles.ADMIN) {
      const group = await this.groupsService.findOneById(id);
      if (!group) throw new NotFoundException(NOT_FOUND);
      await this.institutionsService.checkIsOwner(group.institution.id, userId);
    }

    return await this.groupsService.delete(id);
  }
}
