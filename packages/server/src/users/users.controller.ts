import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { CurrentUser } from './decorators/user.decorator';
import { NO_ACCESS } from 'src/errors/access.errors';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { GroupsService } from 'src/groups/groups.service';
import { NOT_FOUND } from 'src/errors/group.errors';
import { InstitutionsService } from 'src/institutions/institutions.service';

@ApiTags('Пользователи')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@ApiResponse({
  status: HttpStatus.FORBIDDEN,
  description: 'Нет доступа',
})
@ApiCookieAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly institutionsService: InstitutionsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.usersService.findOneById(userId);
    delete user.password;
    return user;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь создан',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации тела запроса',
  })
  @HttpCode(HttpStatus.CREATED)
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Post()
  async create(
    @CurrentUser('role') role: Roles,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
    @Body() dto: CreateUserDto,
  ) {
    if (dto.groupId) {
      const group = await this.groupsService.findOneById(dto.groupId);
      if (!group) throw new NotFoundException(NOT_FOUND);

      if (
        role !== Roles.ADMIN &&
        institutions.some(
          (institution) => institution.id !== group.institution.id,
        )
      )
        throw new ForbiddenException(NO_ACCESS);
    }

    if (dto.institutionsId) {
      const { length } = await this.institutionsService.findAllById(
        dto.institutionsId,
      );
      if (length !== dto.institutionsId.length)
        throw new BadRequestException('Проверьте учебные заведения');
    }

    if (dto.role === Roles.ADMIN && role !== Roles.ADMIN)
      throw new ForbiddenException(NO_ACCESS);

    return await this.usersService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь обновлён',
  })
  @Auth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
    @CurrentUser('id') currentUserId: number,
    @CurrentUser('role') currentUserRole: Roles,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
  ) {
    if (!institutions?.length || currentUserRole !== Roles.ADMIN) {
      delete dto.role;
      const userUpdate = await this.usersService.findOneById(userId);
      if (userUpdate.id !== currentUserId) {
        throw new ForbiddenException(NO_ACCESS);
      }
    }

    return await this.usersService.update(userId, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь удалён',
  })
  @HttpCode(HttpStatus.OK)
  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) userId: number,
    @CurrentUser('id') currentUserId: number,
    @CurrentUser('institutions') institutions: InstitutionEntity[],
  ) {
    // Institution admin cannot delete admin
    if (institutions?.length) {
      const deleteUser = await this.usersService.findOneById(userId);
      if (deleteUser.role === Roles.ADMIN)
        throw new ForbiddenException(NO_ACCESS);
    }
    // Cannot delete itself
    if (userId === currentUserId) throw new ForbiddenException(NO_ACCESS);

    return await this.usersService.delete(userId);
  }
}
