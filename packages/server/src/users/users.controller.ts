import {
  Body,
  Controller,
  Delete,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: Auth guard
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
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.findOneById(userId);
  }

  // TODO: Admin and institution admin guard
  // TODO: Auth guard
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
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  // TODO: Check userId if role is student or teacher
  // TODO: Auth guard
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь обновлён',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.update(userId, dto);
  }

  // TODO: Admin and institution admin guard (institution admin cannot delete admin)
  // TODO: Auth guard
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь удалён',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.delete(userId);
  }
}
