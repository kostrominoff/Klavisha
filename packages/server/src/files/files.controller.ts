import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Auth } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Файлы')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Пользователь не авторизован',
})
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Файлы сохранёны',
  })
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Auth()
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename(_req, file, callback) {
          callback(null, `${new Date().getTime()}_${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @CurrentUser('id') userId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.filesService.create(userId, files);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiCookieAuth()
  @Auth()
  @Get()
  async findAllByUser(@CurrentUser('id') userId: number) {
    return await this.filesService.findAllByUser(userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешный ответ',
  })
  @ApiCookieAuth()
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Delete()
  async delete(
    @CurrentUser('id') userId: number,
    @Query('id', new ParseArrayPipe({ items: Number, separator: ',' }))
    filesId: number[],
  ) {
    return await this.filesService.delete(filesId, userId);
  }
}
