import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { In, Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { readdir } from 'fs/promises';
import { Cron } from '@nestjs/schedule';

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

  async findOneByFilename(filename: string) {
    return await this.fileRepository.findOne({
      where: {
        filename,
      },
    });
  }

  async findAllByFilenames(filenames: string[]) {
    return await this.fileRepository.find({
      where: {
        filename: In(filenames),
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

  @Cron('0 0-23/1 * * *')
  async validateFiles() {
    const allFiles = await readdir(join(__dirname, '..', '..', '/uploads'));
    const filesInDatabase = await this.fileRepository.find({
      where: {
        filename: In(allFiles),
      },
    });

    if (allFiles.length !== filesInDatabase.length) {
      const filesToDelete = allFiles.filter(
        (filename) =>
          !filesInDatabase.some((file) => file.filename === filename),
      );

      filesToDelete.forEach((file) => {
        unlinkSync(join(__dirname, '..', '..', '/uploads', file));
      });
    }
  }
}
