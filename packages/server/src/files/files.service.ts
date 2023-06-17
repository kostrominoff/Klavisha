import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async create(userId: number, files: Express.Multer.File[]) {
    return await this.fileRepository.save(
      files.map((file) => ({
        filename: file.filename,
        mimetype: file.mimetype,
        originalName: file.originalname,
        user: {
          id: userId,
        },
      })),
    );
  }
}
