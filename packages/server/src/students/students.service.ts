import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/types/pagination';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { NO_ACCESS } from 'src/errors/access.errors';

type SearchParams = {
  institutionId?: number;
  groupId?: number;
  institutionAdminId?: number;
  teacherId?: number;
};

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async create({ userId, groupId, ...dto }: CreateStudentDto) {
    return await this.studentRepository.save({
      ...dto,
      group: {
        id: groupId,
      },
      user: {
        id: userId,
      },
    });
  }

  // TODO: Teacher
  async findAll(
    { limit = 30, page = 1 }: Pagination,
    { groupId, institutionId, teacherId, institutionAdminId }: SearchParams,
  ) {
    const [students, count] = await this.studentRepository.findAndCount({
      where: {
        group: {
          id: groupId,
          institution: {
            id: institutionId,
            owners: {
              id: institutionAdminId,
            },
          },
        },
      },
      relations: {
        group: true,
        user: true,
      },
      skip: limit * (page - 1),
      take: limit,
    });
    const pages = Math.ceil(count / limit);
    return { students, count, pages };
  }

  async findOne(id: number) {
    return await this.studentRepository.findOne({
      where: {
        id,
      },
      relations: {
        group: true,
        user: true,
      },
    });
  }

  async update(id: number, { groupId, ...dto }: UpdateStudentDto) {
    return await this.studentRepository.update(
      { id },
      {
        ...dto,
        group: {
          id: groupId,
        },
      },
    );
  }

  async delete(id: number) {
    return await this.studentRepository.delete({ id });
  }

  async checkAccess(groupId: number, institutions: InstitutionEntity[]) {
    if (
      !institutions.some((institutuion) =>
        institutuion.groups.some((group) => group.id === groupId),
      )
    ) {
      throw new ForbiddenException(NO_ACCESS);
    }
  }
}
