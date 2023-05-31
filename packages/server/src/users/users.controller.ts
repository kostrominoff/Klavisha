import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
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
import { Roles } from '@klavisha/types';
import { CurrentUser } from './decorators/user.decorator';
import { NO_ACCESS } from 'src/errors/access.errors';

@ApiTags('Пользователи')
@ApiCookieAuth('accessToken')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Нет доступа',
  })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.findOneById(userId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь создан',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации тела запроса',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Нет доступа',
  })
  @HttpCode(HttpStatus.CREATED)
  @Auth([Roles.ADMIN, Roles.INSTITUTION_ADMIN])
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь обновлён',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Нет доступа',
  })
  @Auth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
    @CurrentUser('id') currentUserId: number,
    @CurrentUser('roles') currentUserRoles: Roles[],
  ) {
    if (
      !currentUserRoles.includes(Roles.INSTITUTION_ADMIN) ||
      !currentUserRoles.includes(Roles.ADMIN)
    ) {
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Нет доступа',
  })
  @HttpCode(HttpStatus.OK)
  @Auth([Roles.ADMIN, Roles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) userId: number,
    @CurrentUser('id') currentUserId: number,
    @CurrentUser('roles') currentUserRoles: Roles[],
  ) {
    // Institution admin cannot delete admin
    if (currentUserRoles.includes(Roles.INSTITUTION_ADMIN)) {
      const deleteUser = await this.usersService.findOneById(userId);
      if (deleteUser.roles.includes(Roles.ADMIN))
        throw new ForbiddenException(NO_ACCESS);
    }
    // Cannot delete itself
    if (userId === currentUserId) throw new ForbiddenException(NO_ACCESS);

    return await this.usersService.delete(userId);
  }
}
