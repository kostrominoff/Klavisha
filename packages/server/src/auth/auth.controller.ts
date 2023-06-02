import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { UserWithoutPassword } from '@klavisha/types';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from 'src/groups/groups.service';
import { NOT_FOUND } from 'src/errors/group.errors';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly groupsService: GroupsService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь авторизован',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Пользователь не авторизован',
  })
  @ApiCookieAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('me')
  async getMe(@CurrentUser() user: UserWithoutPassword) {
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь авторизован',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Ошибка авторизации',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginUserDto,
  ) {
    const tokens = await this.authService.login(dto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });
    return tokens;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь зарегестрирован',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: RegisterUserDto,
  ) {
    const group = await this.groupsService.findOneById(dto.groupId);
    if (!group) throw new NotFoundException(NOT_FOUND);

    const tokens = await this.authService.register(dto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });
    return tokens;
  }
}
