import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/types/pagination';

type SearchParams = {
  institutionId?: number;
  userId?: number;
};

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teachersRepository: Repository<TeacherEntity>,
  ) {}

  async findAll(
    { limit = 30, page = 1 }: Pagination,
    { institutionId, userId }: SearchParams,
  ) {
    const [teachers, count] = await this.teachersRepository.findAndCount({
      where: {
        institution: {
          id: institutionId,
          owners: {
            id: userId,
          },
        },
      },
      relations: {
        institution: true,
        user: true,
      },
      skip: limit * (page - 1),
      take: limit,
    });
    const pages = Math.ceil(count / limit);

    return { teachers, count, pages };
  }

  async findOne(id: number) {
    return await this.teachersRepository.findOne({
      where: {
        id,
      },
      relations: {
        institution: true,
        user: true,
      },
    });
  }

  async delete(id: number) {
    return await this.teachersRepository.delete({
      id,
    });
  }
}
