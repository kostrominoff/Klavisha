import {
  Controller,
  HttpStatus,
  Post,
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
    description: 'Файл сохранён',
  })
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Auth()
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 1, {
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
    return await this.filesService.create(userId, files[0]);
  }
}
