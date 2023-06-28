import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionEntity } from './entities/institution.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { NO_ACCESS } from 'src/errors/access.errors';
import { Pagination } from 'src/types/pagination';

type SearchParams = {
  name?: string;
  city?: string;
};

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
  ) {}

  async findAllById(institutionsId: number[]) {
    return await this.institutionRepository.find({
      where: {
        id: In(institutionsId),
      },
    });
  }

  async findAll(
    { limit = 10, page = 1 }: Pagination,
    { name, city }: SearchParams,
  ) {
    const [institutions, count] = await this.institutionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
        where: {
          name: ILike(`%${name}%`),
          city: ILike(`%${city}%`),
        },
        select: {
          id: true,
          city: true,
          name: true,
          photo: true,
        },
      },
    );
    const pages = Math.ceil(count / limit);
    return {
      institutions,
      count,
      pages,
    };
  }

  async findAllByUser(id: number) {
    return await this.institutionRepository.find({
      where: {
        owners: {
          id: id,
        },
      },
    });
  }

  async findOneById(id: number) {
    return await this.institutionRepository.findOne({
      where: {
        id,
      },
      relations: {
        owners: true,
      },
    });
  }

  async create({ owners, ...dto }: CreateInstitutionDto) {
    const institution = await this.institutionRepository.save({
      ...dto,
      owners: owners.map((owner) => ({
        id: owner,
      })),
    });

    return institution;
  }

  async update(
    institutionId: number,
    { owners, ...dto }: UpdateInstitutionDto,
  ) {
    return await this.institutionRepository.update(
      {
        id: institutionId,
      },
      {
        ...dto,
        owners: owners.map((owner) => ({ id: owner })),
      },
    );
  }

  async delete(id: number) {
    return await this.institutionRepository.delete({
      id: id,
    });
  }

  async checkIsOwner(id: number, userId: number) {
    const institution = await this.findOneById(id);
    if (!institution.owners.map(({ id }) => id).includes(userId))
      throw new ForbiddenException(NO_ACCESS);
  }
}
