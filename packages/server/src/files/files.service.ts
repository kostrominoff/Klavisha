import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { In, Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';

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

  async findAllByUser(id: number) {
    return await this.fileRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findAllById(filesId: number[], userId: number) {
    return await this.fileRepository.find({
      where: {
        id: In(filesId),
        user: {
          id: userId,
        },
      },
    });
  }

  async delete(files: number[], userId: number) {
    const filesToDelete = await this.findAllById(files, userId);

    const deletedFilesFromDisk = filesToDelete.map((file) => {
      unlinkSync(join(__dirname, '..', '..', '/uploads', file.filename));
      return file.id;
    });

    const deletedFiles = await this.fileRepository.delete({
      id: In(deletedFilesFromDisk),
      user: {
        id: userId,
      },
    });

    return deletedFiles;
  }
}
